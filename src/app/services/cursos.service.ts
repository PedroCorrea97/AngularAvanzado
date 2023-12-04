import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Curso } from '../models/curso.model';
import { BehaviorSubject, Observable, catchError, combineLatest, map, shareReplay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private url = 'http://localhost:3000/cursos';
  http = inject(HttpClient);

  private cursoSeleccionadoIdSubject = new BehaviorSubject<number>(0);
  cursoSeleccionadoId$ = this.cursoSeleccionadoIdSubject.asObservable();

  cursos$ = this.http
    .get<Curso[]>(this.url)
    .pipe(shareReplay(1), catchError(this.handleError));

  cursoSeleccionado$ = combineLatest([
    this.cursos$,
    this.cursoSeleccionadoId$
  ]).pipe(
    map(([cursos,cursoSeleccionadoId])=>cursos.find((c)=>c.id===cursoSeleccionadoId))
  );

  seleccionarCurso(cursoId:number){
    this.cursoSeleccionadoIdSubject.next(cursoId);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Error relacionado con la red o del cliente.
      errorMessage = `Ocurrió un error: ${err.error.message}`;
    } else {
      // El backend regresa un código de respuesta de error.
      // El cuerpo de la respuesta puede contener información adicional
      errorMessage = `El servidor regresó el siguiente código: ${err.status}, el mensaje es : ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
