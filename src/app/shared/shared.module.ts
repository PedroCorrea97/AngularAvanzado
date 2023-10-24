import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MensajeConfirmacionComponent } from './mensaje-confirmacion/mensaje-confirmacion.component';

const components = [MensajeConfirmacionComponent];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }