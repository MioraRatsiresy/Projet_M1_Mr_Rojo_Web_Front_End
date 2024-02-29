import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajoutez les en-têtes CORS nécessaires
    const corsReq = req.clone({
      headers: req.headers
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    });

    // Passez la requête modifiée au gestionnaire suivant
    return next.handle(corsReq);
  }
}
