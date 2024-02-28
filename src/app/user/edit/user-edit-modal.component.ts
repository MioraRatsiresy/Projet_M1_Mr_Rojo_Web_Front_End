import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { ProfileUpdateService } from '../../service/profile-update.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styles: './user-edit-modal.component.css'
})
export class UserEditModalComponent {
  editedUser!: User; // Utilisateur à modifier

  constructor(
    public dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User, // Injecter les données de l'utilisateur
    private userService: UserService,
    private profileUpdateService: ProfileUpdateService
  ) {
    this.editedUser = { ...user }; // Copier les données de l'utilisateur dans editedUser
  }

  onClose(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    this.userService.updateUser(this.user.id, this.editedUser).subscribe(
      (response: User) => {
        console.log('Utilisateur modifié avec succès : ', response);
        this.dialogRef.close(); // Fermer le modal après la modification réussie
        this.profileUpdateService.announceProfileUpdate(); // Annoncez la mise à jour du profil
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'utilisateur : ', error);
        // Vous pouvez gérer ici les erreurs liées à la modification de l'utilisateur
      }
    );
  }
}
