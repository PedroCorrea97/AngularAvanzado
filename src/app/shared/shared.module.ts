import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MensajeConfirmacionComponent } from './mensaje-confirmacion/mensaje-confirmacion.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

const components = [MensajeConfirmacionComponent];
const Modules = [CommonModule, MaterialModule,HttpClientModule,BrowserModule, RouterModule]
@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...Modules
  ],
  exports: [
    ...components,
    ...Modules
  ]
})
export class SharedModule { }