import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCategoriasComponent } from './categorias/listado-categorias/listado-categorias.component';
import { ListadoCursosComponent } from './cursos/listado-cursos/listado-cursos.component';
import { ListaCursosAltComponent } from './cursos/lista-cursos-alt/lista-cursos-alt.component';
import { AgregarCursoComponent } from './cursos/agregar-curso/agregar-curso/agregar-curso.component';
import { EliminarCursoComponent } from './cursos/eliminar-curso/eliminar-curso/eliminar-curso.component';

const routes: Routes = [
    { path: '', redirectTo: '/categorias', pathMatch: 'full' },
    { path: 'categorias', component: ListadoCategoriasComponent },
    { path: 'cursos', component: ListadoCursosComponent },
    { path: 'cursos-alt', component: ListaCursosAltComponent },
    { path: 'cursos-agr', component: AgregarCursoComponent },
    { path: 'cursos-dlt/:id', component: EliminarCursoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}