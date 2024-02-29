import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepenseService } from '../../service/depense/depense.service';

export interface DialogData {
  depense: any;
  isNew: boolean;
}

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.css'
})
export class ExpenseDialogComponent {
  constructor(private depenseService: DepenseService,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifierDepense() {
    this.depenseService.updateDepense(this.data.depense._id,this.data.depense).subscribe(
      (response) => {
        console.log('Dépense mis à jour avec succès', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la dépense', error);
      }
    );
  }

  ajouterDepense() {
    this.depenseService.createDepense(this.data.depense).subscribe(
      (response) => {
        console.log('Dépense ajouté avec succès', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de l"ajout de la dépense', error);
      }
    );
  }
}
