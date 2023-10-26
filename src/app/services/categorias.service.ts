import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, shareReplay, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Categoria } from "../models/categoria.model";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class CategoriasService {
  private http = inject(HttpClient);
  private categoriasUrl = apiUrl + "categorias";

  categorias$ = this.http.get<Categoria[]>(this.categoriasUrl).pipe(
    shareReplay(1),
    tap((categorias) => console.log("[Categorias]: ", categorias)),
    catchError(this.handleError)
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let mensajeError: string;
    if (err.error instanceof ErrorEvent) {
      mensajeError = `Ocurrió un error: ${err.error.message}`;
    } else {
      mensajeError = `El servidor regresó un código de error: ${err.status}: ${err.message}`;
    }
    return throwError(() => mensajeError);
  }

}
