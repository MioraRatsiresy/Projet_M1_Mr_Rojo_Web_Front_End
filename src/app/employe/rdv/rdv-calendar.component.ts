import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RdvService } from '../../service/rdv.service';
import { RendezVous } from '../../model/rdv.model';
import { Subject } from 'rxjs';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog'; // Importez MatDialog pour ouvrir le modal
import { CancelRdvModalComponent } from './cancel/CancelRdvModalComponent.component';
import { Observable } from 'rxjs';
import '@angular/compiler';
import { AddUnavailabilityModalComponent } from '../indisponibilite/add-unavailability-modal.component';
import * as moment from 'moment-timezone'; // Importer moment-timezone

@Component({
  selector: 'app-rdv-calendar',
  templateUrl: './rdv-calendar.component.html',
  styleUrls: ['./rdv-calendar.component.css'],
})
export class RdvCalendarComponent implements OnInit, AfterViewInit {
  viewDate: Date = new Date();
  events: any[] = [];
  refresh: Subject<any> = new Subject();
  calendar!: Calendar;
  isLoading: boolean = true;

  constructor(private rdvService: RdvService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRdvs();
  }

  ngAfterViewInit(): void {
    this.initializeCalendar();
  }

  loadRdvs() {
    this.isLoading = true;
    this.rdvService.getRdv().subscribe(
      (data: RendezVous[]) => {
        // Regrouper les rendez-vous par jour
        const rdvsByDay: { [key: string]: RendezVous[] } = {};
        data.forEach((rdv) => {
          const date = new Date(rdv.dateheuredebut).toISOString().split('T')[0];
          if (!rdvsByDay[date]) {
            rdvsByDay[date] = [];
          }
          rdvsByDay[date].push(rdv);
        });

        // Vider l'array des événements existants
        this.events = [];

        Object.keys(rdvsByDay).forEach((date) => {
          const rdvs = rdvsByDay[date];
          let commissionTotal = 0;
          rdvs.forEach((rdv) => {
            if (rdv.status === 10) {
              // Vérifier si rdv.status est égal à 0
              // Récupérer le prix du rendez-vous ou définir 0 par défaut
              const prix = rdv.service.prix ? Number(rdv.service.prix) : 0;
              // Récupérer la commission du service ou définir 0 par défaut
              const commission =
                rdv.service && rdv.service.commission
                  ? Number(rdv.service.commission)
                  : 0;

              const commissionRdv = commission * prix;
              commissionTotal += commissionRdv;
            }
          });

          const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          });
          const commissionTotalAriary = commissionTotal;
          const commissionTotalFormatted = commissionTotalAriary.toLocaleString(
            'fr-FR',
            { style: 'currency', currency: 'MGA' }
          );
          const dayLabel = `Comission: ${commissionTotalFormatted}`;

          this.events.push({
            title: dayLabel,
            start: date,
            allDay: true,
            color: 'blue',
            extendedProps: {
              commission: commissionTotal,
            },
          });

          rdvs.forEach((rdv) => {
            let color;
            if (rdv.status === 10) {
              color = 'green';
            } else if (rdv.status === -10) {
              color = 'red';
            } else {
              color = undefined;
            }
            const startTime = new Date(rdv.dateheuredebut).toISOString();
            const endTime = new Date(rdv.dateheurefin).toISOString();
            this.events.push({
              title: rdv.service.nom,
              id: rdv._id,
              start: startTime,
              end: endTime,
              color: color,
            });
          });
        });

        if (this.calendar) {
          this.calendar.removeAllEvents();
          this.calendar.addEventSource(this.events);
        }
        this.refresh.next(true);
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  formatDateWithTimezone(dateString: string): string {
    // Convertir la date en utilisant le fuseau horaire de Madagascar
    const date = moment.tz(dateString, 'Indian/Antananarivo');

    // Formater la date selon vos besoins
    const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');

    return formattedDate;
  }

  initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        events: this.events,
        timeZone: 'Indian/Antananarivo', // Fuseau horaire de Madagascar
        locale: 'fr',
        eventClick: this.handleEventClick.bind(this), // Ajoutez cette ligne pour gérer le clic sur un événement
      });
      this.calendar.render();
    } else {
      console.error('Élément avec l\'identifiant "calendar" non trouvé.');
    }
  }

  handleEventClick(arg: any) {
    const clickedEvent = arg.event;
    const rdvId = clickedEvent.id; // Suppose que l'ID du rendez-vous est stocké dans les extendedProps de l'événement
    this.getRdvDetails(rdvId).subscribe(
      (rdv) => {
        if (rdv) {
          this.openCancelRdvModal(rdv);
        } else {
          // Aucun rendez-vous trouvé pour cet ID
          console.log('Aucun rendez-vous trouvé pour cet ID.');
        }
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des détails du rendez-vous :',
          error
        );
      }
    );
  }

  openCancelRdvModal(rdv: RendezVous) {
    // Vérifier si le statut du rendez-vous n'est pas égal à zéro
    if (rdv.status === 0) {
      const dialogRef = this.dialog.open(CancelRdvModalComponent, {
        width: '300px',
        data: { rdv: rdv },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'cancel') {
          this.cancelRdv(rdv);
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'valid') {
          this.validRdv(rdv);
        }
      });
    }
  }

  // handleDateClick(arg: any) {
  //   const clickedDate = arg.date;
  //   const rdv = this.getRdvDetails(clickedDate);
  //   if (rdv) {
  //     this.openCancelRdvModal(rdv);
  //   }
  // }

  getRdvDetails(rdvId: string): Observable<RendezVous | undefined> {
    return new Observable((observer) => {
      this.rdvService.getRdv().subscribe(
        (data: RendezVous[]) => {
          const rdvDetails = data.find((rdv) => rdv._id === rdvId);

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

  // openCancelRdvModal(rdv: RendezVous) {
  //   const dialogRef = this.dialog.open(CancelRdvModalComponent, {
  //     width: '300px',
  //     data: { rdv: rdv }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'cancel') {
  //       this.cancelRdv(rdv);
  //     }
  //   });
  // }

  cancelRdv(rdv: RendezVous) {
    this.rdvService.cancelRdv(rdv._id).subscribe(
      () => {
        console.log('Rendez-vous annulé avec succès');
        this.loadRdvs();
      },
      (error) => {
        console.error("Erreur lors de l'annulation du rendez-vous :", error);
      }
    );
  }

  validRdv(rdv: RendezVous) {
    this.rdvService.validRdv(rdv._id).subscribe(
      () => {
        console.log('Rendez-vous validé avec succès');
        this.loadRdvs();
      },
      (error) => {
        console.error('Erreur lors de la validation du rendez-vous :', error);
      }
    );
  }

  notDisponible() {
    // Appeler la méthode pour ouvrir le modal d'ajout d'indisponibilité
    const dialogRef = this.dialog.open(AddUnavailabilityModalComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
      data: {}, // Vous pouvez passer des données au modal si nécessaire
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Recharger les données du calendrier après la fermeture du dialogue
      this.loadRdvs();
    });
  }
}
