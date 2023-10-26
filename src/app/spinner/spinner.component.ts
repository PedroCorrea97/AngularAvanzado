import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
private loadingService=inject(LoaderService);
loading$ = this.loadingService.loading$;
}
