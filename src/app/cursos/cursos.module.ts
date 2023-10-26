import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CursosRoutingModule } from "./cursos-routing.module";
import { ListaCursosComponent } from "./lista-cursos/lista-cursos.component";
import { DetalleCursoComponent } from "./detalle-curso/detalle-curso.component";
import { ListaCursosAltComponent } from './lista-cursos-alt/lista-cursos-alt.component';
import { AgregarEditarCursoComponent } from './agregar-editar-curso/agregar-editar-curso.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListaCursosComponent, DetalleCursoComponent, ListaCursosAltComponent, AgregarEditarCursoComponent],
  imports: [CommonModule, CursosRoutingModule, ReactiveFormsModule],
})
export class CursosModule {}
