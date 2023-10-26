import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasModule } from './categorias/categorias.module';
import { SharedModule } from './shared/shared.module';
import { CursosModule } from './cursos/cursos.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SpinnerComponent } from './spinner/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CategoriasModule,
    CursosModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
