import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from '../../utils/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getAllServices(): Observable<any> {
    return this.http.get(`${base_url}/services/listeservices`);
  }

  createService(formData:any): Observable<any> {
    return this.http.post(`${base_url}/services/creerservice`, formData);
}

  updateService(id: string, service: any): Observable<any> {
    return this.http.put(`${base_url}/services/updateservice/${id}`, service);
  }

  deleteService(id: string): Observable<any> {
    return this.http.put(`${base_url}/services/deleteservice/${id}`, {});
  }

  getServiceDetails(id: string): Observable<any> {
    return this.http.get(`${base_url}/detailservice/${id}`);
  }

  searchService(query: any): Observable<any> {
    return this.http.get(`${base_url}/services/rechercherservice`, { params: query });
  }
}
