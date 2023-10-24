import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriasService } from '../services/categorias/categorias.service';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    ListadoCategoriasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ListadoCategoriasComponent
  ],
  providers: [CategoriasService]
})

export class CategoriasModule { }
