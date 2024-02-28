import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserEditModalComponent } from '../../user/edit/user-edit-modal.component';
import { ProfileUpdateService } from '../../service/profile-update.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: User | undefined;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private userService: UserService, private dialog: MatDialog, private profileUpdateService: ProfileUpdateService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.profileUpdateService.profileUpdated$.subscribe(() => {
      this.loadUserProfile();
    });
  }

  loadUserProfile() {
    this.isLoading = true;
    // Chargez le profil de l'utilisateur en fonction de l'ID de l'utilisateur dans la route
    const userId = '65c683dd47ef1c3c0c5e6eb7';
    this.userService.getUserById(userId).subscribe(
      (data: User) => {
        this.user = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement du profil : ', error);
        this.isLoading = false ;
      }
    );
  }

  openEditModal(): void {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      width: '400px',
      data: this.user // Passez les données de l'utilisateur au modal de modification
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermé');
    });
  }
}
