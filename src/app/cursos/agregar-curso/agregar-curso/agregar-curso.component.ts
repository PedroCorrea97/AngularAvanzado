import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subject, catchError, combineLatest, concatMap, map, of, startWith, tap } from 'rxjs';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.scss']
})
export class AgregarCursoComponent {
  private categoriasService = inject(CategoriasService);
  private cursosService = inject(CursosService);
  private router = inject(Router);
  private route = inject (ActivatedRoute);

  private mensajeErrorSubject = new Subject<string>();
  mensajeError$ = this.mensajeErrorSubject.asObservable();

  cursoId=0;

  formulario = new FormGroup({
    nombre: new FormControl("",[Validators.required,Validators.minLength(5)]),
    precio: new FormControl(0,[Validators.required,Validators.min(100)]),
    categoriaId: new FormControl(0,[Validators.required,Validators.min(1)]),
  });

  categorias$ = this.categoriasService.categoria$;
  guardarCursoAction$ = this.cursosService.cursoAgregar$;

  cursoSeleccionado$ = this.route.paramMap.pipe(
    map((paramMap)=>{
      const id = paramMap.get('id');
      return id ? +id : 0;
    }),
    concatMap(id=>{
      this.cursoId = id;
      return this.cursosService.getCurso(id);
    }),
    tap(curso => this.formulario.patchValue({...curso})),
    catchError(err=>{
      this.mensajeErrorSubject.next(err);
      return EMPTY;
    })
  );

  vm$ = combineLatest([
    this.cursoSeleccionado$,
    this.guardarCursoAction$.pipe(
      startWith(null),
      tap(curso=>console.log('Ejecuté acción guardar, ',curso)),
      concatMap(curso=>{
        if(curso){
          return this.cursosService.guardar(curso).pipe(
            tap(()=>{
              this.router.navigateByUrl("/cursos");
            })
          );
        }
        return of({});
      })
    )
  ]).pipe(
    map(([curso, accionGuardar])=>({curso}))
  );

  get nombre() {
    return this.formulario.controls["nombre"];
  }
  
  get precio() {
    return this.formulario.controls["precio"];
  }
  
  get categoria() {
    return this.formulario.controls["categoriaId"];
  }

  guardar(){
    if(this.formulario.valid){
      const cursoGuardar = {
        id: this.cursoId,
        ...this.formulario.value
      }
      this.cursosService.addCurso(cursoGuardar)
    }
  }
}
