import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListaCursosAltComponent } from './lista-cursos-alt/lista-cursos-alt.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { AgregarCursoComponent } from './agregar-curso/agregar-curso/agregar-curso.component';
import { RouterModule } from '@angular/router';
import { EliminarCursoComponent } from './eliminar-curso/eliminar-curso/eliminar-curso.component';



@NgModule({
  declarations: [
    ListadoCursosComponent,
    ListaCursosAltComponent,
    DetalleCursoComponent,
    AgregarCursoComponent,
    EliminarCursoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ListadoCursosComponent
  ]
})
export class CursosModule { }
