import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.css'
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
