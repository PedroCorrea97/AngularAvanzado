import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/enviroment.development';
import { Observable, catchError, throwError, map, combineLatest, BehaviorSubject, Subject, of, tap } from 'rxjs';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from '../categorias/categorias.service';
import { NotificacionService } from '../notificacion/notificacion.service';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  apiURL = environment.apiurl + "/cursos";
  private http = inject(HttpClient);
  private categoriaService = inject(CategoriasService);
  private notificacionService = inject(NotificacionService);
  
  cursos$ = this.http.get<Cursos[]>(this.apiURL).pipe(
    map(cursos => cursos.map(curso => ({ ...curso, precioIVA: curso.precio * 1.16 }))),
    catchError(this.handleError)
  );

  cursosConCategoria$ = combineLatest([this.cursos$, this.categoriaService.categoria$]).pipe(
    map(([cursos, categorias]) =>
      cursos.map(curso => ({
        ...curso,
        categoria: categorias.find(cat => cat.id === curso.categoriaId)?.nombre
      }))
    )
  );

  private cursoAgregarSubject = new Subject<Cursos>();
  cursoAgregar$ = this.cursoAgregarSubject.asObservable();

  addCurso(curso:any){
    this.cursoAgregarSubject.next(curso);
  }

  guardar(curso:Cursos){
    if(curso.id){
      return this.actualizarCurso(curso);
    }
    else{
      return this.agregarCurso(curso);
    }
  }

  //region "Metodos HTTP"

  agregarCurso(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.apiURL, curso).pipe(
      tap(()=> this.notificacionService.setSuccessMessage("Curso agregado con éxito.")),
      catchError(this.handleError))
  }

  actualizarCurso(curso: Cursos): Observable<Cursos> {
    return this.http.put<Cursos>(`${this.apiURL}/${curso.id}`, curso).pipe(catchError(this.handleError))
  }

  getCurso(id: number): Observable<Cursos> {
    return id > 0 ? this.http.get<Cursos>(`${this.apiURL}/${id}`)
      : this.inicializarCurso();
  }

  inicializarCurso() {
    return of({ id: 0, nombre: "", precio: 0, categoriaId: 0 } as Cursos);
  }

  delete(id: number) {
    return this.http.delete<Cursos>(`${this.apiURL}/${id}`).pipe(
      tap(()=> this.notificacionService.setSuccessMessage("Curso Eliminado con éxito")),
      catchError(this.handleError))
  }

  //end region

  private handleError(err: HttpErrorResponse): Observable<never> {
    let mensajeErr: string;
    mensajeErr = err.error instanceof ErrorEvent ? `Ocurrió un error: ${err.error.message}` : `El servidor regresó un código de error: ${err.status} : ${err.message}`
    return throwError(() => mensajeErr);
  }
}
