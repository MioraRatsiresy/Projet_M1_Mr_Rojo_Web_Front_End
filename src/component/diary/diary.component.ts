import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { Observable, Subject } from 'rxjs';
import { RdvService } from '../../service/rdv/rdv.service';
import { MatDialog } from '@angular/material/dialog';
import { RendezVous } from '../../model/rdv.model';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CancelRdvModalComponent } from '../cancel-rdv-modal/cancel-rdv-modal.component';
import { AddUnavailabilityModalComponent } from '../add-unavailability-modal/add-unavailability-modal.component';
@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent implements OnInit, AfterViewInit{
  viewDate: Date = new Date();
  events: any[] = [];
  refresh: Subject<any> = new Subject();
  calendar!: Calendar;

  constructor(private rdvService: RdvService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRdvs();
  }

  ngAfterViewInit(): void {
    this.initializeCalendar();
  }

  loadRdvs() {
    this.rdvService.getRdv().subscribe(
      (data: RendezVous[]) => {
        
        // Regrouper les rendez-vous par jour
        const rdvsByDay: { [key: string]: RendezVous[] } = {};
        data.forEach(rdv => {
          console.log(rdv);
          const date = new Date(rdv.dateheuredebut).toISOString().split('T')[0];
          if (!rdvsByDay[date]) {
            rdvsByDay[date] = [];
          }
          rdvsByDay[date].push(rdv);
        });
  
        // Vider l'array des événements existants
        this.events = [];
  
        Object.keys(rdvsByDay).forEach(date => {
          const rdvs = rdvsByDay[date];
          let commissionTotal = 0;
          rdvs.forEach(rdv => {
            if(rdv.service){
              const prix = Number(rdv.prix);
              const commission = Number(rdv.service.commission);
              const commissionRdv = commission * prix;
              commissionTotal += commissionRdv;
            }
          });
  
          const formattedDate = new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' });
          const commissionTotalAriary = commissionTotal;
          const commissionTotalFormatted = commissionTotalAriary.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' });
          const dayLabel = `${formattedDate} - Comm: ${commissionTotalFormatted}`;
  
          this.events.push({
            title: dayLabel,
            start: date,
            allDay: true,
            color: 'blue',
            extendedProps: {
              commission: commissionTotal
            }
          });
  
          rdvs.forEach(rdv => {
            const title = rdv.service? rdv.service.nom :'Indisponibilité';
            let color;
            if (rdv.status === 10) {
              color = 'green';
            } else if (rdv.status === -10) {
              color = 'red';
            } else {
              color = undefined;
            }
            const startTime = rdv.dateheuredebut;
            const endTime = rdv.dateheurefin;
            this.events.push({
              title: title,
              start: startTime,
              end: endTime,
              color: color
            });
          });
        });
  
        if (this.calendar) {
          this.calendar.removeAllEvents();
          this.calendar.addEventSource(this.events);
        }
        this.refresh.next(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        events: this.events,
        locale: 'fr',
        timeZone: 'Africa/Nairobi',
        eventClick: this.handleEventClick.bind(this) // Ajoutez cette ligne pour gérer le clic sur un événement
      });
      this.calendar.render();
    } else {
      console.error('Élément avec l\'identifiant "calendar" non trouvé.');
    }
  }
  
  // Ajoutez cette fonction pour gérer le clic sur un événement
  handleEventClick(arg: any) {
    const clickedEvent = arg.event;
    this.getRdvDetails(new Date(clickedEvent.start)).subscribe(
      (rdv) => {
        if (rdv) {
          this.openCancelRdvModal(rdv);
        } else {
          // Aucun rendez-vous trouvé pour cette date
          console.log("Aucun rendez-vous trouvé pour cette date.");
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des détails du rendez-vous :", error);
      }
    );
  }
  
  getRdvDetails(clickedDate: Date): Observable<RendezVous | undefined> {
  return new Observable(observer => {
    this.rdvService.getRdv().subscribe(
      (data: RendezVous[]) => {
        const dateString = clickedDate.toISOString().split('T')[0];
        const rdvDetails = data.find(rdv => {
          const eventDateString = new Date(rdv.dateheuredebut).toISOString().split('T')[0];
          return eventDateString === dateString;
        });

        if (rdvDetails) {
          observer.next(rdvDetails); // Émettre les détails du rendez-vous
        } else {
          observer.next(undefined); // Aucun rendez-vous trouvé
        }
        observer.complete(); // Terminer l'observable
      },
      (error) => {
        observer.error(error); // Émettre une erreur en cas de problème
      }
    );
  });
}

  openCancelRdvModal(rdv: RendezVous) {
    const dialogRef = this.dialog.open(CancelRdvModalComponent, {
      width: '300px',
      data: { rdv: rdv }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        this.cancelRdv(rdv);
      }
    });
  }

  cancelRdv(rdv: RendezVous) {
    this.rdvService.cancelRdv(rdv._id).subscribe(
      () => {
        console.log('Rendez-vous annulé avec succès');
        this.loadRdvs();
      },
      error => {
        console.error('Erreur lors de l\'annulation du rendez-vous :', error);
      }
    );
  }

  notDisponible(){
    // Appeler la méthode pour ouvrir le modal d'ajout d'indisponibilité
    const dialogRef = this.dialog.open(AddUnavailabilityModalComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
