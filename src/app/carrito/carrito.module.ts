import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaItemsComponent } from './lista-items/lista-items.component';
import { DetalleItemComponent } from './detalle-item/detalle-item.component';
import { TotalCarritoComponent } from './total-carrito/total-carrito.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CarritoComponent,
    ListaItemsComponent,
    DetalleItemComponent,
    TotalCarritoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarritoComponent,
      },
    ]),
  ],
})
export class CarritoModule {}
