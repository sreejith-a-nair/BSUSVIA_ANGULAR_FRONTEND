import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<any>> {
                console.log('Interceptor is working!----------------------------  ');

                const jwtToken = localStorage.getItem('jwt');
                if (jwtToken) {
                  const modifiedRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${jwtToken}`,
                    },
                  });
                    return next.handle(modifiedRequest);}

                else {
                    return next.handle(request);
          }   
     }
}
