import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import flatpickr from 'flatpickr';
import { ListService } from '../../service/list/list.service';
import { base_url } from '../../utils/url';
import { Options } from 'flatpickr/dist/types/options';
class Rdv{
	idClient: string="";
	idEmploye: string="";
	idService:string="";
	dateHeureDebut:string="";
	dateHeureFin:string="";
	prix:number=0;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  filter = new FormControl('', { nonNullable: true });
	services:any[]=[];
	employes:any[]=[];
	viewDate:Date= new Date();
	idServiceChoosed:string="";
	timeRdv:Event=new Event('initial');
	rdv:Rdv=new Rdv();
	offresSpec:any[]=[];
	listRdv:any[]=[];
	horaire:any[]=[];

  calendarOptions: CalendarOptions = {
		initialView: 'timeGridDay',
		headerToolbar: {
			left: 'prev,next',
			center: 'title',
			right: 'timeGridWeek,timeGridDay' // user can switch between the two
		  },
		  events:[] as EventInput[],
		plugins: [timeGridPlugin],
		editable: true,
		eventClick: this.handleEventClick.bind(this)
	  };

    options:Options = {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minDate: 'today',
      time_24hr: true,
      maxDate: this.viewDate.setDate(this.viewDate.getDate()+14),
      disable: [
            function(date: { getDay: () => number; }) {
              // Return true to disable weekends (Saturday and Sunday)
              return (date.getDay() === 0);
            }
          ],
        onChange: (selectedDates: Date[], dateStr: string, instance: any) => {
        const selectedDate = selectedDates[0]; // Get the selected date
          const maxTime = (date:Date): number => {
          const self = this as ListComponent
          // Use `self` instead of `this` to refer to the outer `this` context
          return this.listeService.getMaxPickableHour(date,this.horaire); // Set the maximum selectable time (in milliseconds since midnight)
        }; // Set the maximum selectable time (in milliseconds since midnight)
    
        const minTime=(date:Date):number=>{
          const self= this as ListComponent
          return this.listeService.getMinPickageHour(date,this.horaire)
        };
        instance.set('maxTime', maxTime(selectedDate)); 
        instance.set('minTime', minTime(selectedDate)); 
      }
       
      };
    

      ngOnInit(): void {
        this.http.get(base_url+'/services/listeservices').subscribe({
          next: (res:any) =>{
            this.services=res;	
          },
          error: (error)=>{
            console.error('An error occurred:', error.error.message);
          }
        }
          );
        flatpickr(this.elementRef.nativeElement.querySelector('input'), this.options);
        this.listeService.getListRdv().subscribe({
           next : (res)=>{
              this.listRdv = res.data;
              console.log(this.listRdv);
              console.log(this.services);
              this.calendarOptions.events = this.listeService.convertRdvToCalendarEvent(this.listRdv, this.services);
              console.log(this.calendarOptions.events);
            },
           error: (error)=>{
              console.error(error);
           }
        });
        this.listeService.getListHoraire().subscribe({
          next: (res) => {
            this.horaire = res;
          },
          error:(error)=>{
            console.error(error);
          }
        });
        //this.calendarOptions.events=[this.convertRdvToCalendarEvent(this.listRdv)];
        }

        
        constructor(private http:HttpClient,private elementRef:ElementRef,private listeService:ListService) {

		
          //this.getListRdv();
            this.http.get(base_url+'/clients/rdv/offreSpecial').subscribe(
              (res: any) => {
              // Handle successful response
              if (res) {
                this.offresSpec=res;	
              //	console.log(res);
              } 
              },
              (error) => {
                // Handle error
                console.error('An error occurred:', error.error.error);
                // You can show a user-friendly message here if needed
                //alert( error.error.error);
              }
              );    
          }
      
          onSelectService( id:Event){
            this.rdv.idService= this.idServiceChoosed=(id.target as HTMLInputElement).value;		
            
           }
           onSelectEmp(id:Event){
            this.rdv.idEmploye=(id.target as HTMLInputElement).value;
           }
        
           onDateChange(id:Event){
            this.timeRdv=id;			
           }
          onSubmitRdv(){
        
            const dateChoosed=this.elementRef.nativeElement.querySelector("#dtp").value;
            if(this.idServiceChoosed==""||dateChoosed=="")alert("need to pick a service and date");
            else{
              this.http.post(base_url+'/clients/rdv/emp', {timechoosed:dateChoosed}).subscribe(
                  (res: any) => {
                    // Handle successful response
                    if (res) {
                  //	console.log(res)
                    this.employes=res.res;
                  
                    } 
                    },
                    (error) => {
                    // Handle error
                    console.error('An error occurred:', error.error.error);
                    // You can show a user-friendly message here if needed
                    alert( error.error.error);
                    }
                  );
            }
          }
        
          onAdd(){
        
            const dateParts=(this.elementRef.nativeElement.querySelector("#dtp").value).split("-");
            const year = parseInt(dateParts[0]); // Parse the year part as an integer
            const month = parseInt(dateParts[1]) - 1; // Parse the month part as an integer (subtract 1 as months are zero-based in JavaScript)
            const day = parseInt(dateParts[2].split(" ")[0]); // Parse the day part as an integer
            const time=dateParts[2].split(" ");
          
            const hm=time[1].split(":");
          
        
            const datechoosed=	new Date(year,month,parseInt(time[0]),parseInt(hm[0]),parseInt(hm[1]));
            this.rdv.idClient=localStorage.getItem("idUser") || "";
            this.rdv.prix=this.services.find(service=>service.id==this.rdv.idService).prix;
            this.rdv.dateHeureDebut= datechoosed.toISOString();
            datechoosed.setMinutes(datechoosed.getMinutes()+this.services.find(service=>service.id==this.rdv.idService).delai);
            this.rdv.dateHeureFin= datechoosed.toISOString();
            this.offresSpec.forEach(element => {
              if(this.rdv.idService==element.idService){
              //	console.log();
                if(new Date(this.rdv.dateHeureDebut)>=new Date (element.dateDebut) && new Date (this.rdv.dateHeureDebut)<= new Date (element.dateFin))
                {
                  this.rdv.prix=this.rdv.prix- ((this.rdv.prix*element.reduction)/100)
                }
              
              }
            });
            this.http.post(base_url+'/clients/rdv/insert', {rdv:this.rdv}).subscribe(
              (res: any) => {
                // Handle successful response
                if (res) {
                alert("rdv in");
                //this.getListRdv()
                this.listRdv.push(res.res)
                this.calendarOptions.events= this.convertRdvToCalendarEvent(this.listRdv);
              //	console.log(this.listRdv)
                
                  } 
                },
                (error) => {
                // Handle error
                console.error('An error occurred:', error);
                // You can show a user-friendly message here if needed
                alert( error.error.error);
                }
              );
        
          }
        
          getServiceName(idService: any): string {
            const service = this.services.find(service => service.id === idService);
            return service ? service.nom : ''; 
            }
        
        
            async getListRdv(): Promise<any> {
            try {
              const res: any = await this.http.get(base_url+'/clients/rdv/list/').toPromise();
              if (res) {
              console.log("fetching data");
              // Check if res contains data directly or nested under a property
              const responseData = res.hasOwnProperty('data') ? res['data'] : res;
              console.log(responseData);
              this.listRdv = responseData;
              this.calendarOptions.events= this.convertRdvToCalendarEvent(responseData);
              //console.log(responseData);
            //	return responseData; // Return the response data
              } else {
              throw new Error("Response is undefined.");
              }
            } catch (error) {
              console.error('An error occurred:', error);
              // You can handle the error further if needed
              throw error; // Re-throw the error to propagate it
            }
            }
            convertRdvToCalendarEvent(rdvs:any[]):any[]{
            const convertedArray: any[] = [];
            rdvs.forEach(item=>{
              const convertedItem={ title: this.getServiceName(item.idService), start: item.dateHeureDebut,end:item.dateHeureFin,idRdv:item.id }
              convertedArray.push(convertedItem);
            });
        
            return convertedArray;
            }
        
           async deleteRdv(idRdv:string){
            let params = new HttpParams().set('idRdv',idRdv || '');
            try {
              const res = await this.http.delete(base_url+'/clients/rdv/delete/', { params }).toPromise();
            //	console.log(res);
              this.getListRdv();
              } catch (error) {
              console.error('An error occurred:', error);
              // You can show a user-friendly message here if needed
              }
            }
           async handleEventClick(info: any) {
            // You can customize this function to display a popup/modal with event details
            const result = confirm(`Rendez vous : ${info.event.title}\nClick OK to delete the current rdv.`);
            if (result) {
              // Code execution logic goes here
              if(info.event.start>new Date()){		
              await this.deleteRdv(info.event.extendedProps.idRdv);
              
              
              
            //	this.getListRdv();
              //console.log(this.listRdv);
                
              const indexToRemove = this.listRdv.findIndex(rdv => rdv.id === info.event.extendedProps.idRdv);
        
              // Check if the element exists in the array
              if (indexToRemove !== -1) {
                // Remove the element from the array
                this.listRdv.splice(indexToRemove, 1);
              } 
              this.calendarOptions.events= this.convertRdvToCalendarEvent(this.listRdv);
              
              //this.calendarOptions.events=[this.convertRdvToCalendarEvent(this.listRdv)];
              alert("deleted");
              }
              else{ 
              alert("TOO LATE DUDDEEE");
              }
              console.log('Code execution triggered!');
            }
            }
        
            async getListHoraire(){
            const res: any = await this.http.get(base_url+'/clients/horaire/list/', ).toPromise();
              if (res) {
             
              // Check if res contains data directly or nested under a property
              const responseData = res.hasOwnProperty('data') ? res['data'] : res;
              this.horaire = responseData;
            //  this.calendarOptions.events= this.convertRdvToCalendarEvent(responseData);
              console.log(responseData);
            //	return responseData; // Return the response data
              } else {
                throw new Error("Response is undefined.");
              }	
            }
        
}
