import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from '../../utils/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }
  getMaxPickableHour(date: Date,horaire:any[]): number {
		const day=date.getDay();
    console.log(horaire);
		const maxhour=horaire.find(h=>h.dow==day).heureMidiFin

		return maxhour;
	}

  getMinPickageHour(date:Date,horaire:any[]):number {
		const day=date.getDay();
		const minhour=horaire.find(h=>h.dow==day).heureMatinDebut
		return minhour;
	}

  getListRdv(): Observable<any> {
    try {
        return this.http.get(base_url+'/clients/rdv/list');
       
    } catch (error) {
        console.error('An error occurred:', error);
        // You can handle the error further if needed
        throw error; // Re-throw the error to propagate it
    }
}

  convertRdvToCalendarEvent(rdvs:any[],services:any[]):any[]{
		const convertedArray: any[] = [];
		rdvs.forEach(item=>{
			const convertedItem={ title: this.getServiceName(item.idService,services), start: item.dateheuredebut,end:item.dateheurefin,idRdv:item.id }
			convertedArray.push(convertedItem);
		});

		return convertedArray;
	  }
      getServiceName(idService: any,services:any[]): string {
		const service = services.find(service => service.id === idService);
		return service ? service.nom : ''; 
	  }

    getListHoraire():Observable<any>{
      return this.http.get(base_url+'/clients/horaire/list' );
    }
}
