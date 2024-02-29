import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RendezVous } from '../../model/rdv.model';

@Component({
  selector: 'app-cancel-rdv-modal',
  templateUrl: './cancel-rdv-modal.component.html',
  styleUrl: './cancel-rdv-modal.component.css'
})
export class CancelRdvModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelRdvModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rdv: RendezVous }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Nom du jour de la semaine
      day: '2-digit', // Jour du mois (2 chiffres)
      month: 'long', // Nom du mois
      year: 'numeric', // Année (4 chiffres)
      hour: 'numeric', // Heure (format 12 heures)
      minute: 'numeric' // Minute
    };

    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }

  formatPrice(price: any): string {
    price = price + "";
    // Vérifier si price est une chaîne de caractères représentant un nombre
    if (isNaN(Number(price))) {
        return 'Prix non disponible';
    }

    // Convertir la chaîne de caractères en nombre
    const priceNumber = Number(price);

    // Convertir le prix en Ariary malgache
    const priceInMGA = Math.round(priceNumber);

    // Retourner le prix en tant que chaîne de caractères avec le symbole MGA
    return priceInMGA.toString() + ' MGA';
}
}
