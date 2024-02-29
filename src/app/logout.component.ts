import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Appeler la fonction de déconnexion lors de l'initialisation du composant
    this.logout();
  }

  logoutClient() {
    // Appeler la fonction de déconnexion du service d'authentification
    this.authService.logout();
    // Rediriger vers une page de connexion ou une autre page appropriée après la déconnexion
    this.router.navigate(['/login']);
  }
}
