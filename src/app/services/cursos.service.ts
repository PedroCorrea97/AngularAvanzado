import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, map, of, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Curso } from "../models/curso.model";
import { CategoriasService } from "./categorias.service";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class CursosService {
  private http = inject(HttpClient)
  private categoriasService = inject(CategoriasService);

  private cursosUrl = apiUrl + "cursos";

  cursos$ = this.http.get<Curso[]>(this.cursosUrl).pipe(
    tap(cursos => console.log("[Cursos]: ", cursos)),
    map(cursos => cursos.map(curso => ({
      ...curso,
      precioMasIva: curso.precio * 1.16
    } as Curso))),
    catchError(this.handleError)
  );


  cursosConCategorias$ = combineLatest([
    this.cursos$,
    this.categoriasService.categorias$
  ]).pipe(
    map(([cursos, categorias]) =>
      cursos.map(curso => ({
        ...curso,
        categoria: categorias.find(cat => cat.id == curso.categoriaId)?.nombre
      } as Curso))
    )
  );

  private cursoAgregarSubject = new Subject<Curso>();
  cursoAgregar$ = this.cursoAgregarSubject.asObservable();

  addCurso(curso:any){
    this.cursoAgregarSubject.next(curso);
  }

  guardar(curso:Curso){
    if(curso.id){
      return this.actualizarCurso(curso);
    }
    else{
      return this.agregarCurso(curso);
    }
  }


  //region "Metodos HTTP"

  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.cursosUrl, curso);
  }

  actualizarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.cursosUrl}/${curso.id}`, curso);
  }

  getCurso(id: number): Observable<Curso> {
    return id > 0 ? this.http.get<Curso>(`${this.cursosUrl}/${id}`)
      : this.inicializarCurso();
  }

  inicializarCurso() {
    return of({ id: 0, nombre: "", precio: 0, categoriaId: 0 } as Curso);
  }

  //end region

  private handleError(err: HttpErrorResponse): Observable<never> {
    let mensajeError: string;
    if (err.error instanceof ErrorEvent) {
      mensajeError = `Ocurrió un error: ${err.error.message}`;
    }
    else {
      mensajeError = `El servidor regresó un código de error: ${err.status}: ${err.message}`;
    }
    return throwError(() => mensajeError);
  }
}
