import { Component, inject } from '@angular/core';
import { NotificacionService } from './services/notificacion/notificacion.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjsangular';
  private servicioNotificacion = inject(NotificacionService);
  successMessage$ = this.servicioNotificacion.successMessageAction$.pipe(
    tap(()=>{
      setTimeout(()=>{
        this.servicioNotificacion.clearAllMessage();
      },1500);
    })
  );
  errorMessage$ = this.servicioNotificacion.errorMessageAction$.pipe(
    tap(()=>{
      setTimeout(()=>{
        this.servicioNotificacion.clearAllMessage();
      },1500);
    })
  );
}
