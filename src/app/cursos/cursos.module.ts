import { AgregarCursoComponent } from './agregar-curso/agregar-curso.component';
import { NgModule } from '@angular/core';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListaCursosAltComponent } from './lista-cursos-alt/lista-cursos-alt.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';


@NgModule({
  declarations: [
    ListadoCursosComponent,
    ListaCursosAltComponent,
    DetalleCursoComponent,
    AgregarCursoComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ListadoCursosComponent
  ]
})
export class CursosModule { }
