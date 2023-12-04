import { Component, inject } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { EMPTY, catchError, map } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.scss',
})
export class DetalleCursoComponent {
  mensajeError = '';
  cursosService = inject(CursosService);
  carritoService = inject(CarritoService);

  curso$ = this.cursosService.cursoSeleccionado$.pipe(
    catchError((err)=>{
      this.mensajeError = err;
      return EMPTY;
    })
  )

  tituloPagina$ = this.curso$.pipe(
    map((curso)=> ( curso ? `Detalle para: ${curso.titulo} `:'')  )
  );

  agregarCarrito(curso:Curso){
    this.carritoService.agregarCarrito(curso);
  }
}
