import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { base_url } from '../../utils/url';
import { RendezVous } from '../../model/rdv.model';

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  constructor(private http: HttpClient) { }

  getRdv(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${base_url}/employes/employee`);
  }

  cancelRdv(id: string): Observable<any> {
    return this.http.get<any>(`${base_url}/valider_un_rdv?status=-10`).pipe(
      catchError(this.handleError)
    );
  }

  indisponibiliseRdv(dateDebut: Date, dateFin: Date): Observable<any> {
    // Construire le corps de la requête avec les données nécessaires
    const body = {
      dateheuredebut: dateDebut,
      dateheurefin: dateFin,
      status: 0,
    };

    // Effectuer la requête POST vers l'API backend
    return this.http.post<any>(`${base_url}/employes/inserer_rdv`, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Une erreur s\'est produite : ', error);
    return throwError('Une erreur s\'est produite, veuillez réessayer plus tard.');
  }
}