import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../../service/service/service.service';

export interface DialogData {
  service: any;
  isNew: boolean;
}

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent {

  selectedFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceService: ServiceService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file.type.match('image.*')) {
        this.selectedFile = file;
        this._snackBar.open("Fichier image téléchargé avec succès!", 'Close', {
          duration: 2000,
        });
      } else {
        this.selectedFile = null;
        this._snackBar.open("Le fichier sélectionné n'est pas une image", 'Close', {
          duration: 2000,
        });
      }
    } else {
      this.selectedFile = null;
      this._snackBar.open("Aucun fichier sélectionné ou l'élément d'entrée est indéfini", 'Close', {
        duration: 2000,
      });
    }
  }
  
  onFilesChange(files: File[]): void {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.match('image.*')) {
        this.selectedFile = file;
        this._snackBar.open("Fichiers images téléchargés avec succès!", 'Close', {
          duration: 2000,
        });
      } else {
        this.selectedFile = null;
        this._snackBar.open("Le fichier sélectionné n'est pas une image", 'Close', {
          duration: 2000,
        });
      }
    } else {
      this.selectedFile = null;
      this._snackBar.open("Aucun fichier sélectionné", 'Close', {
        duration: 2000,
      });
    }
  }
  
  
  modifierService(): void {
    if (this.selectedFile) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.data.service.image = reader.result as string;
        
        this.serviceService.updateService(this.data.service.id, this.data.service).subscribe(
          () => {
            console.log('Service updated successfully');
            this.successMessage = 'Service updated successfully';
            this.dialogRef.close({ success: true });
          },
          (error) => {
            console.error('Error updating service', error);
            this.errorMessage = error;
          }
        );
      };
  
      reader.readAsDataURL(this.selectedFile);
    } else {
      this._snackBar.open("No file selected", 'Close', {
        duration: 2000,
      });
    }
  }

  ajouterService() {
    if (this.selectedFile) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.data.service.image = reader.result as string;
        
        this.serviceService.createService(this.data.service).subscribe(
          (response) => {
            console.log('Service ajouté avec succès', response);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Erreur lors de l"ajout du service', error);
          }
        );
      };
  
      reader.readAsDataURL(this.selectedFile);
    } else {
      this._snackBar.open("No file selected", 'Close', {
        duration: 2000,
      });
    }
  }
  

}
