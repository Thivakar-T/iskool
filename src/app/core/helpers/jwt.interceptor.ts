import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    aId: any;
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            // 'Content-Type': 'application/json',
            //'Accept': 'multipart/form-data'
        }
        const token = this.authenticationService.getToken();
        if(JSON.parse(localStorage.getItem('currentUser'))){
          this.aId = JSON.parse(localStorage.getItem('currentUser')).data.currentUserLoginObj;
        }
    
        if (token) {
          headersConfig['Authorization'] = `IsKool ${token}`
          // headersConfig['aId'] = this.aId;
        }
        const _req = request.clone({ setHeaders: headersConfig });
        return next.handle(_req);
    }
}
