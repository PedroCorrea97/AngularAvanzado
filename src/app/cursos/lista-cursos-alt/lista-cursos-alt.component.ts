import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, map, tap } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-lista-cursos-alt',
  templateUrl: './lista-cursos-alt.component.html',
  styleUrls: ['./lista-cursos-alt.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListaCursosAltComponent {
private cursoService=inject(CursosService);

private cursoSeleccionadoSubject = new BehaviorSubject<number|undefined>(0);
private mensajeErrorSubject = new Subject<string>();
mensajeError$ = this.mensajeErrorSubject.asObservable();

cursoSeleccionadoAction$ = this.cursoSeleccionadoSubject.asObservable();

cursos$ = this.cursoService.cursosConCategorias$.pipe(
  catchError(err=>{
    this.mensajeErrorSubject.next(err);
    return EMPTY;
  })
)

cursoSeleccionado$ = combineLatest([
  this.cursos$,
  this.cursoSeleccionadoAction$
]).pipe(
  map(([cursos,cursoSeleccionadoId])=>
    cursos.find(curso=>curso.id === cursoSeleccionadoId)        
  ),
  //tap(cursoSeleccionado=>console.log('Curso seleccionado:',cursoSeleccionado))
);


  seleccionarCurso(curso:Curso){
    this.cursoSeleccionadoSubject.next(curso.id);
  }


}
