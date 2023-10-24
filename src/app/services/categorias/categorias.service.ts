import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Categorias } from 'src/app/models/categorias';
import { environment } from 'src/environments/enviroment.development';
import { Paginacion } from 'src/app/models/paginacion';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  apiURL = environment.apiurl;
  private http = inject(HttpClient);

  getAllCategories(pageIndex: number, pageSize: number):Observable<Paginacion <Categorias>> {
    return this.http.get<Paginacion<Categorias>>(`${this.apiURL}`+`/categorias`, 
    { params: new HttpParams().set('pageIndex', pageIndex.toString()).set('pageSize', pageSize.toString())}).pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse) { if( err.error instanceof ErrorEvent ) { console.warn('Cliente: ', err.message); }else{ console.warn('Cliente: ', err.status);}
  return throwError(( ) =>  new Error (err.error.message)) }
}