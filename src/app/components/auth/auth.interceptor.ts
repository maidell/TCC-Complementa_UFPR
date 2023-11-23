import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
constructor(public loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
