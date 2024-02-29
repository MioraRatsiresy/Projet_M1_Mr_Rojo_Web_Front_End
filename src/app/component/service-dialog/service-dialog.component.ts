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
      this.selectedFile = inputElement.files[0];
      this._snackBar.open("File uploaded successfully!", 'Close', {
        duration: 2000,
      });
    } else {
      this.selectedFile = null;
      this._snackBar.open("No file selected or input element is undefined", 'Close', {
        duration: 2000,
      });
    }
  }
  
  onFilesChange(files: File[]): void {
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this._snackBar.open("Files uploaded successfully!", 'Close', {
        duration: 2000,
      });
    } else {
      this.selectedFile = null;
      this._snackBar.open("No files selected", 'Close', {
        duration: 2000,
      });
    }
  }
  
  modifierService(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.selectedFile);
      reader.onload = () => {
        this.data.service.image = reader.result;
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
    }
  }

  ajouterService(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    for (const key in this.data.service) {
      if (this.data.service.hasOwnProperty(key)) {
        formData.append(key, this.data.service[key]);
      }
    }

    this.serviceService.createService(formData).subscribe(
      () => {
        console.log('Service added successfully');
        this.successMessage = 'Service added successfully';
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.error('Error adding service', error);
        this.errorMessage = error;
      }
    );
  }
}
