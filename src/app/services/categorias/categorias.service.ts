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
  
  getAllCategories():Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiURL}`+`/categorias`).pipe(catchError(this.handleError))
  }

  delete(id:number){ 
    return this.http.delete(`${this.apiURL}/categorias/${id}`).pipe(catchError(this.handleError)) }

  private handleError(err: HttpErrorResponse) { if( err.error instanceof ErrorEvent ) { console.warn('Cliente: ', err.message); }else{ console.warn('Cliente: ', err.status);}
  return throwError(( ) =>  new Error (err.error.message)) }
}