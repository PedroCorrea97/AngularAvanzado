import { Injectable, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor {
  private loadingService = inject(LoaderService);
  private totalRequests = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(()=>{
        this.totalRequests--;
        if(this.totalRequests==0){
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
