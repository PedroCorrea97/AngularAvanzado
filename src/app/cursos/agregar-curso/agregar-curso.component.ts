import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.scss'],
})
export class AgregarCursoComponent {
  form!:FormGroup;
  controlForm = (propiedad: string) => this.form.controls[propiedad];

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
}