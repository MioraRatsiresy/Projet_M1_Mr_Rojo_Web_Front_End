// Angular
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
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

  public selectedFile: File | null = null;
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private serviceService: ServiceService,
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this._snackBar.open("Successfully upload!", 'Close', {
        duration: 2000,
      });
    } else {
      this.selectedFile = null;
      this._snackBar.open("No file selected or input element is undefined", 'Close', {
        duration: 2000,
      });
    }
  }
  
  onFilesChange(files: File[]) {
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this._snackBar.open("Successfully upload!", 'Close', {
        duration: 2000,
      });
    } else {
      this.selectedFile = null;
      this._snackBar.open("No file selected", 'Close', {
        duration: 2000,
      });
    }
  }
  
  modifierService() {
    if (this.selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(this.selectedFile);
      reader.onload = () => {
        this.data.service.image = reader.result;
        this.serviceService.updateService(this.data.service.id, this.data.service).subscribe(
          (response) => {
            console.log('Service mis à jour avec succès', response);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du service', error);
          }
        );
      };
    }
  }

  ajouterService() {
    console.log(this.data.service)
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    for (const key in this.data.service) {
      if (this.data.service.hasOwnProperty(key)) {
        console.log(key)
        formData.append(key, this.data.service[key]);
      }
    }

    this.serviceService.createService(formData).subscribe(
      (response) => {
        console.log('Service ajouté avec succès', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de l"ajout du service', error);
      }
    );
  }

}