import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, concatMap, of } from 'rxjs';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.scss'],
})
export class AgregarCursoComponent {
  form!:FormGroup;
  controlForm = (propiedad: string) => this.form.controls[propiedad];
  private route = inject(ActivatedRoute)

  constructor( private formbuilder: FormBuilder) {}
  get nombre() { return this.controlForm('nombre') }
    ngOnInit() {
      this.form = this.formbuilder.group(
        { 
          nombre: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(250) ]],
          precio: ['', [ Validators.required, Validators.min(100)]],
        }
        );
    }

    /* vm$= combineLatest([
      this.cursoSeleccionado$,
      this.guardarCursoAction$.pipe(
        concatMap(curso=>{
          if(curso){


          }
          return of({});
        })
      )
    ]); */
}