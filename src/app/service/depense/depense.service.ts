import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { base_url } from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http: HttpClient) { }

  getAllDepenses(): Observable<any> {
    return this.http.get(`${base_url}/depenses/listedepenses`);
  }

  createDepense(service: any): Observable<any> {
    return this.http.post(`${base_url}/depenses/creerdepense`, service);
  }

  updateDepense(id: string, service: any): Observable<any> {
    return this.http.put(`${base_url}/depenses/updatedepense/${id}`, service);
  }

  deleteDepense(id: string): Observable<any> {
    return this.http.put(`${base_url}/depenses/deletedepense/${id}`, {});
  }

  getDepenseDetails(id: string): Observable<any> {
    return this.http.get(`${base_url}/detailservice/${id}`);
  }

  searchDepense(query: any): Observable<any> {
    return this.http.get(`${base_url}/depenses/rechercherdepense`, { params: query });
  }
}
