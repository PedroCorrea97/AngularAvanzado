import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';



@NgModule({
  declarations: [
    ListadoCursosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListadoCursosComponent
  ]
})
export class CursosModule { }
