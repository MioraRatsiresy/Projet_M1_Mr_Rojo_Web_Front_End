import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserEditModalComponent } from '../../user/edit/user-edit-modal.component';
import { ProfileUpdateService } from '../../service/profile-update.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user: User | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private auTh: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private profileUpdateService: ProfileUpdateService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.profileUpdateService.profileUpdated$.subscribe(() => {
      this.loadUserProfile();
    });
  }

  loadUserProfile() {
    this.isLoading = true;
    const userId = this.auTh.getAuthToken() ?? ''; // Utilisation d'une chaîne vide comme valeur par défaut
    this.userService.getUserById(userId).subscribe(
      (data: User) => {
        this.user = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement du profil : ', error);
        this.isLoading = false;
      }
    );
  }

  openEditModal(): void {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      width: '400px',
      data: this.user, // Passez les données de l'utilisateur au modal de modification
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal fermé');
    });
  }
}
