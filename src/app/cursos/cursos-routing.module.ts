import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaCursosComponent } from "./lista-cursos/lista-cursos.component";
import { ListaCursosAltComponent } from "./lista-cursos-alt/lista-cursos-alt.component";
import { AgregarEditarCursoComponent } from "./agregar-editar-curso/agregar-editar-curso.component";

const routes: Routes = [
  {
    path: "",
    component: ListaCursosComponent,
  },
  {
    path: "cursos-alt",
    component: ListaCursosAltComponent
  },
  {
    path:"agregar",
    component:AgregarEditarCursoComponent
  },
  {
    path:"editar/:id",
    component:AgregarEditarCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
