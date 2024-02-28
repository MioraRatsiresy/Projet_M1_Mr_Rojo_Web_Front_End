import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RendezVous } from '../../../model/rdv.model';
import moment from 'moment-timezone';
import 'moment/locale/fr'; // Importer la locale française

@Component({
  selector: 'app-cancel-rdv-modal',
  templateUrl: './cancel-rdv-modal.component.html',
  styleUrls: ['./cancel-rdv-modal.component.css']
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

  onValidClick(): void {
    this.dialogRef.close('valid');
  }
  
  isEndDateAfterNow(): boolean {
    // Convertir la date de fin du rendez-vous en objet Date
    const endDate = new Date(this.data.rdv.dateheurefin);

    // Soustraire 3 heures à la date de fin
    endDate.setHours(endDate.getHours() - 3);

    console.log(endDate);
    
    // Obtenir la date et l'heure actuelles
    const now = new Date();
    // Comparer la date de fin avec la date et l'heure actuelles
    return !(endDate > now);
}

  

  formatDate(dateString: string): string {
    // Utiliser moment.js pour formater la date et convertir en heure locale (Afrique/Antananarivo)
    const formattedDate = moment(dateString).tz('Indian/Antananarivo').subtract(3, 'hours').locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm');
    return formattedDate;
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
