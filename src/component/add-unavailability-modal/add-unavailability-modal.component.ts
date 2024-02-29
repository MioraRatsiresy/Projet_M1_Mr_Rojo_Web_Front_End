import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RdvService } from '../../service/rdv/rdv.service';

@Component({
  selector: 'app-add-unavailability-modal',
  templateUrl: './add-unavailability-modal.component.html',
  styleUrl: './add-unavailability-modal.component.css'
})
export class AddUnavailabilityModalComponent {
  errorMessage: string = ''; 
  successMessage: string = '';
  constructor(
    public dialogRef: MatDialogRef<AddUnavailabilityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rendezVousService: RdvService
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.rendezVousService.indisponibiliseRdv(this.data.startDateTime, this.data.endDateTime).subscribe(
      () => {
        console.log('Indisponibilité enregistrée avec succès !');
        this.successMessage = 'Indisponibilité enregistrée avec succès !';
        // Fermeture du dialogue après avoir enregistré les dates d'indisponibilité
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'indisponibilité :', error);
        // Gérer les différents types d'erreurs et afficher un message approprié
        if (error.status === 400) {
          this.errorMessage = "Un rendez-vous existe déjà dans l'intervalle de dates spécifié";
        } else {
          this.errorMessage = "Une erreur s'est produite lors de l'enregistrement de l'indisponibilité. Veuillez réessayer plus tard.";
        }
      }
    );
  }
}
