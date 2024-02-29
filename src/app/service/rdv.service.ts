import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RendezVous } from '../model/rdv.model';

@Injectable({
  providedIn: 'root',
})
export class RdvService {
  private apiUrl = 'http://localhost:1672'; // Assurez-vous que l'URL correspond à votre API

  constructor(private http: HttpClient) {}

  getRdv(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/api_employee/employee`);
  }

  cancelRdv(id: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/api_employee/valider_un_rdv?id=${id}&status=-10`
      )
      .pipe(catchError(this.handleError));
  }

  validRdv(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/api_employee/valider_un_rdv?id=${id}&status=10`)
      .pipe(catchError(this.handleError));
  }

  indisponibiliseRdv(
    dateDebut: Date,
    dateFin: Date,
    idEmploye: string
  ): Observable<any> {
    // Construire le corps de la requête avec les données nécessaires
    const body = {
      idEmploye: idEmploye,
      dateheuredebut: dateDebut,
      dateheurefin: dateFin,
      status: 0,
    };

    // Effectuer la requête POST vers l'API backend
    return this.http
      .post<any>(`${this.apiUrl}/api_employee/inserer_rdv`, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error("Une erreur s'est produite :", error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur de l'API ${error.status}, ` + `body: ${error.error}`
      );

      // Si le backend renvoie un message d'erreur spécifique
      if (error.error && error.error.message) {
        return throwError(error.error.message);
      }
    }
    // Retourne une erreur observable avec un message d'erreur convivial
    return throwError("Une erreur s'est produite. Veuillez réessayer.");
  }
}
