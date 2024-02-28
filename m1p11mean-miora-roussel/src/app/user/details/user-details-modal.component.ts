import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../model/user.model';  // Assurez-vous d'importer le modèle User ou utilisez le bon chemin

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
})
export class UserDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User // Injecter les données de l'utilisateur
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close(); // Cette ligne ferme le dialogue ou le modal
  }
}
