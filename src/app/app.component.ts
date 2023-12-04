import { Component, inject } from '@angular/core';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  carritoService = inject(CarritoService);
  title = 'rxjssignalsuv';
}
