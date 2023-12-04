import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos/cursos.component';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CursosComponent, ListaCursosComponent, DetalleCursoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CursosComponent,
      },
    ]),
  ],
})
export class CursosModule {}
