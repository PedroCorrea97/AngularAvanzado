import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasModule } from './categorias/categorias.module';
import { SharedModule } from './shared/shared.module';
import { CursosModule } from './cursos/cursos.module';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/customPaginatorint.util';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CategoriasModule,
    CursosModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorIntl() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
