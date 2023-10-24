import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { environment } from 'src/environments/enviroment.development';
import { Paginacion } from 'src/app/models/paginacion';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  apiURL = environment.apiurl;
  private http = inject(HttpClient);
  
  categoria$ = this.http.get<Categoria>(`${this.apiURL}` + `/categorias`).pipe(catchError(this.handleError));

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/categorias/${id}`).pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let mensajeErr: string;
    mensajeErr = err.error instanceof ErrorEvent ? `Ocurrió un error: ${err.error.message}` : `El servidor regresó un código de error: ${err.status} : ${err.message}`
    return throwError(() => mensajeErr);
  }
}