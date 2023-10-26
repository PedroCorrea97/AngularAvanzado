import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, map, switchMap } from 'rxjs';
import { Cursos } from 'src/app/models/cursos';

@Component({
  selector: 'app-lista-cursos-alt',
  templateUrl: './lista-cursos-alt.component.html',
  styleUrls: ['./lista-cursos-alt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaCursosAltComponent {
  private cursoService = inject(CursosService);
  private cursoSeleccionadoSubject = new BehaviorSubject<number | undefined>(0);
  private msgsErrrSubject = new Subject<string>();
  msgsErr$ = this.msgsErrrSubject.asObservable();
  cursoSeleccionadoAction$ = this.cursoSeleccionadoSubject.asObservable();

  cursos$ = this.cursoService.cursosConCategoria$.pipe(
    catchError(err=>{
      this.msgsErrrSubject.next(err);
      return EMPTY;
    })
  )

  cursoSeleccionado$ = combineLatest([
    this.cursos$,
    this.cursoSeleccionadoAction$
  ]).pipe(
    map(([cursos, cursoSeleccionadoId]) =>
      cursos.find(curso => curso.id === cursoSeleccionadoId)
    ),
    //tap(cursoSeleccionado=>console.log('Curso seleccionado:',cursoSeleccionado))
  );

  seleccionarCurso(curso: Cursos) {
    this.cursoSeleccionadoSubject.next(curso.id);
  }

}
