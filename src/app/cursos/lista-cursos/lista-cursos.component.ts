import { Component, inject } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.scss'
})
export class ListaCursosComponent {
  cursosService = inject(CursosService);
  tituloPagina = 'Cursos';
  mensajeError = '';

  cursos$ = this.cursosService.cursos$.pipe(
    catchError((err)=>{
      this.mensajeError=err;
      return EMPTY;
    })
  );

  cursoSeleccionado$ = this.cursosService.cursoSeleccionado$.pipe(
    catchError((err)=>{
      this.mensajeError=err;
      return EMPTY;
    })
  );

  seleccionarCurso(cursoId:number){
    this.cursosService.seleccionarCurso(cursoId);
  }
}
