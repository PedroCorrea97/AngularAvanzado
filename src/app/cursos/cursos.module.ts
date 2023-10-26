import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListaCursosAltComponent } from './lista-cursos-alt/lista-cursos-alt.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';



@NgModule({
  declarations: [
    ListadoCursosComponent,
    ListaCursosAltComponent,
    DetalleCursoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ListadoCursosComponent
  ]
})
export class CursosModule { }
