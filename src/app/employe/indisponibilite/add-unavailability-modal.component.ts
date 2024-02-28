import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RdvService } from '../../service/rdv.service';

@Component({
  selector: 'app-add-unavailability-modal',
  templateUrl: './add-unavailability-modal.component.html',
  styleUrls: ['./add-unavailability-modal.component.css']
})
export class AddUnavailabilityModalComponent {

  errorMessage: string = ''; // Propriété pour stocker les messages d'erreur
  successMessage: string = ''; // Propriété pour stocker les messages de succès

  constructor(
    public dialogRef: MatDialogRef<AddUnavailabilityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rendezVousService: RdvService
  ) { }

  onSaveClick(): void {
    // Remplacez '#ICI_ID_EMPLOYE' par l'ID de l'employé approprié
    const idEmploye = '#ICI_ID_EMPLOYE';
  
    // Appel de la méthode indisponibiliseRdv du service avec les données appropriées
    this.rendezVousService.indisponibiliseRdv(this.data.startDateTime, this.data.endDateTime, idEmploye).subscribe(
      () => {
        console.log('Indisponibilité enregistrée avec succès !');
        this.successMessage = 'Indisponibilité enregistrée avec succès !';
        // Fermeture du dialogue après avoir enregistré les dates d'indisponibilité
        this.dialogRef.close({ success: true });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  

  onCancelClick(): void {
    // Fermeture du dialogue sans enregistrer les dates d'indisponibilité
    this.dialogRef.close();
  }

}
