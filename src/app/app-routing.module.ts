import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCategoriasComponent } from './categorias/listado-categorias/listado-categorias.component';
import { ListadoCursosComponent } from './cursos/listado-cursos/listado-cursos.component';

const routes: Routes = [
    { path: '', redirectTo: '/categorias', pathMatch: 'full' },
    { path: 'categorias', component: ListadoCategoriasComponent },
    { path: 'cursos', component: ListadoCursosComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}