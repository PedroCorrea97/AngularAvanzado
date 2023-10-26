import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const componentes=[HeaderComponent,FooterComponent]

@NgModule({
  declarations: [
    ...componentes
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ...componentes
  ]
})
export class SharedModule { }
