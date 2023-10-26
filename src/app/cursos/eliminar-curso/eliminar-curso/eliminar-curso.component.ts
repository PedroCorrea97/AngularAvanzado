import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subject, catchError, concatMap, map, combineLatest, startWith, tap, of } from 'rxjs';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.component.html',
  styleUrls: ['./eliminar-curso.component.scss']
})
export class EliminarCursoComponent {
  private cursosService = inject(CursosService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  cursoId=0;

  private mensajeErrorSubject = new Subject<string>();
  mensajeError$ = this.mensajeErrorSubject.asObservable();
  private eliminarCursoSubject = new Subject<any>();
  eliminarCursoAction$ =this.eliminarCursoSubject.asObservable();

  cursoAEliminar$ = this.activatedRoute.paramMap.pipe(
    map((paramMap)=>{
      const id = paramMap.get("id");
      return id ? +id:0
    }),
    concatMap((id)=>{
      this.cursoId = id;
      return this.cursosService.getCurso(this.cursoId);
    }),
    catchError(err=>{
      this.mensajeErrorSubject.next(err);
      return EMPTY;
    })
  );

  vm$ = combineLatest([
    this.cursoAEliminar$,
    this.eliminarCursoAction$.pipe(
      startWith(null),
      tap((c) => console.log("El curso que se envió desde el subject", c)),
      concatMap((c => {
        if(c){
          return this.cursosService.delete(c.id).pipe(
            tap(() => {
              this.router.navigateByUrl("/cursos")
            })
          )
        }
        return of({})
      }))
    )
  ]).pipe(
    map(([curso, actioneliminar]) => ({curso}))
  )

  elimniar(curso:any){
    this.eliminarCursoSubject.next(curso);
  }
}
