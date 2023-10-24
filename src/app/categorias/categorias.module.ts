import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';
import { CategoriasService } from '../services/categorias/categorias.service';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListadoCategoriasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ListadoCategoriasComponent
  ],
})

export class CategoriasModule { }
