import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(response => {
            let errMsg = '';

console.info("CALLING THE ERROR INTERCEPTOR!!!");

            if (response.response instanceof ErrorEvent) {    
                errMsg = `Client Error: ${response.response.message}`;
           
            } else {  

                if (response.status === 401 || response.status === 0) {
                    console.info("Teste de logout... aqui chama meu service responsavel por dar o logout");
                } else {
                    errMsg = `Message: ${response.message}. Server Error: ${response.status}.`;
                }  
            }

            return throwError(response);
        }));
    }
}