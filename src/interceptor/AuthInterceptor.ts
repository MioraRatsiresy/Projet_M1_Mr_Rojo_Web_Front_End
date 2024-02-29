import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifier si l'utilisateur est connecté
   
    if (this.authService.isLoggedIn()) {
        
      // Récupérer le jeton d'authentification mis à jour
      const authToken = this.authService.getAuthToken();
      
      // Cloner la requête et ajouter le jeton d'authentification
      req = req.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
    } 
    return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if(error.status === 401){
                console.log('Unauthorized');

                this.router.navigate(['/']);
            }
            return throwError(error);
        })
    );
  }
}
