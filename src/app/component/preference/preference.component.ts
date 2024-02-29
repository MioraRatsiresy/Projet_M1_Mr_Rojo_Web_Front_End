import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { base_url } from '../../utils/url';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})
export class PreferenceComponent {
  listPreferenceEmp:PreferenceEmploye[]=[];
  listePreferenceServices:PreferenceService[]=[];
  idservice:string="";
  idEmploye:string="";
  services:any[]=[];
  employes:any[]=[];
  idClient:string="";
  constructor(private http:HttpClient,private elementRef:ElementRef){
    this.getListPreferedService()
   this.getListPreferedEmploye()
   this.http.get(base_url+'/services/listeservices').subscribe(
     (res: any) => {
       // Handle successful response
       if (res) {
         this.services=res;          
         } 
       },
       (error) => {
       // Handle error
         console.error('An error occurred:', error);
         // You can show a user-friendly message here if needed
         alert('error occurred');
       }
     );

    

       this.http.get(base_url+'/users/employes/active').subscribe(
         (res: any) => {
           // Handle successful response
           if (res) {
             this.employes=res;          
             } 
           },
           (error) => {
           // Handle error
             console.error('An error occurred:', error);
             // You can show a user-friendly message here if needed
             alert('error occurred');
           }
         );
 }

 onSelectService(id:Event){
     this.idservice=(id.target as HTMLInputElement).value;
 }
 onSelectEmploye(id:Event){
   this.idEmploye=(id.target as HTMLInputElement).value;
}
onAddPreferenceEmploye(){
 if(!this.listPreferenceEmp.find(x=>x.idEmploye==this.idEmploye)){
   this.http.post(base_url+'/clients/pref/',{idEmploye:this.idEmploye}).subscribe(
         (res: any) => {
           // Handle successful response
           if (res) {
             this.getListPreferedEmploye();
             alert("inserted");          
             } 
           },
           (error) => {
           // Handle error
             console.error('An error occurred:', error);
             // You can show a user-friendly message here if needed
             alert('error occurred');
           }
         );
 }else {
   alert("already in")
 }

 }

  onAddPreferenceService(){
   if(!this.listePreferenceServices.find(x=>x.idService==this.idservice)){
     this.http.post(base_url+'/clients/services/pref/',{idService:this.idservice}).subscribe(
       (res: any) => {
         // Handle successful response
         if (res) {
         this.getListPreferedService();   
         alert("inserted");  
           } 
         },
         (error) => {
         // Handle error
           console.error('An error occurred:', error);
           // You can show a user-friendly message here if needed
           alert('error occurred');
         }
       );
   }else {
     alert("already in");
   }
  
 }

async getListPreferedEmploye(){
  
   this.http.get(base_url+'/clients/pref').subscribe(
     (res: any) => {
       // Handle successful response
       if (res) {
         console.log(res);
         this.listPreferenceEmp=res.data;
         }
       },
       (error) => {
       // Handle error
         console.error('An error occurred:', error);
         // You can show a user-friendly message here if needed
               }
     );
 }

 async getListPreferedService(){
  
   this.http.get(base_url+'/clients/services/pref').subscribe(
     (res: any) => {
       // Handle successful response
       if (res) {
         console.log(res);
         this.listePreferenceServices=res.data;
         }
       },
       (error) => {
       // Handle error
         console.error('An error occurred:', error);
         // You can show a user-friendly message here if needed
               }
     );
 }

 getEmployeName(idEmp: any): string {
   const emp = this.employes.find(service => service.id === idEmp);
   return emp ? emp.nom +" " + emp.prenom : ''; 
  }

   getServiceName(idService: any): string {
     const service = this.services.find(service => service.id === idService);
     return service ? service.nom : ''; 
    }  
   onDeletePreferedEmp(idEmp:any){
     let params = new HttpParams().set("idEmploye", idEmp);
     this.http.delete(base_url+'/clients/pref/',{params}).subscribe(
       (res: any) => {
         // Handle successful response
         if (res) {          
           this.getListPreferedEmploye();
           }
         },
         (error) => {
         // Handle error
           console.error('An error occurred:', error);
           // You can show a user-friendly message here if needed
                 }
       );
   }

   onDeletePreferedService(idS:any){
     let params = new HttpParams().set("idService", idS);

     this.http.delete(base_url+'/clients/services/pref/',{params}).subscribe(
       (res: any) => {
         // Handle successful response
         if (res) {
          // console.log(res);
           this.getListPreferedService();
           }
         },
         (error) => {
         // Handle error
           console.error('An error occurred:', error);
           // You can show a user-friendly message here if needed
                 }
       );
   }
}
export class PreferenceEmploye{
  idClient: string="";
  idEmploye: string="";
}

export class PreferenceService{
  idClient: string="";
  idService: string="";
}