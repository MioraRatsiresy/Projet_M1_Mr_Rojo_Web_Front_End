import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { base_url } from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private http: HttpClient) { }

  getStatTempsMoyenne(annee?:any, employeId?:any): Observable<any> {
    let body: { [key: string]: any } = {};
    if(annee != undefined){
      body['annee'] = annee;
    }
    if(employeId != undefined && employeId!="undefined"){
      body['employeId'] = employeId;
    }
    return this.http.post(`${base_url}/stats/tempsmoyenne`, body);
  }

  getListeEmploye(): Observable<any> {
    return this.http.get(`${base_url}/stats/listeemployes`);
  }
  
  
  getStatReservation(annee?:any): Observable<any> {
    let body: { [key: string]: any } = {};
    if(annee != undefined){
      body['annee'] = annee;
    }
    return this.http.post(`${base_url}/stats/statreservation`,body);
  }
  getStatCA(annee?:any): Observable<any> {
    let body: { [key: string]: any } = {};
    if(annee != undefined){
      body['annee'] = annee;
    }
    return this.http.post(`${base_url}/stats/statCA`,body);
  }
  getStatBenefice(annee?:any): Observable<any> {
    let body: { [key: string]: any } = {};
    if(annee != undefined){
      body['annee'] = annee;
    }
    return this.http.post(`${base_url}/stats/statBenefice`,body);
  }

}
