import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private loadingService = inject(LoaderService);
    private totalRequest = 0;
    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.totalRequest++;
        this.loadingService.setLoading(true);
        return next.handle(request).pipe(finalize(() => {
            this.totalRequest--;
            if (this.totalRequest == 0) { this.loadingService.setLoading(false); }
        }));
    }
}
