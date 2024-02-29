import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_url } from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class DeviceRegistryService {

  constructor(private http: HttpClient) { }

  device_register(data:any): Observable<any> {
    return this.http.post(`${base_url}/devices`, data);
  }
}
