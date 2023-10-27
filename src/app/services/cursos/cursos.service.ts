import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/enviroment.development';
import { Observable, catchError, throwError, map, combineLatest, BehaviorSubject, of, Subject } from 'rxjs';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  apiURL = environment.apiurl;
  private http = inject(HttpClient);
  private categoriaService = inject(CategoriasService);
  
  cursos$ = this.http.get<Cursos[]>(`${this.apiURL}` + `/cursos`,).pipe(
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
//region "Métodos HTTP"
addCurso(curso:any){
  this.cursoAgregarSubject.next(curso);
}
guardar(curso:Cursos){
  return curso.id && curso.id > 0 ? this.actualizarCurso(curso) : this.agregarCurso(curso);
}
agregarCurso(curso:Cursos):Observable<Cursos>{
  return this.http.post<Cursos>(this.apiURL,curso);
}

actualizarCurso(curso:Cursos):Observable<Cursos>{
  return this.http.put<Cursos>(`${this.apiURL}/${curso.id}`,curso);
}


  getCurso(id:number):Observable<Cursos>{
    return id>0 ? this.http.get<Cursos>(`${this.apiURL}/${id}`)
          : this.inicializarCurso();
  }

  inicializarCurso(){
    return of({id:0,nombre:"",precio:0,categoriaId:0} as Cursos);
  }

  private cursoAgregarSubject = new Subject<Cursos>();
  cursoAgregar$ = this.cursoAgregarSubject.asObservable();



  

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/cursos/${id}`).pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let mensajeErr: string;
    mensajeErr = err.error instanceof ErrorEvent ? `Ocurrió un error: ${err.error.message}` : `El servidor regresó un código de error: ${err.status} : ${err.message}`
    return throwError(() => mensajeErr);
  }
}
