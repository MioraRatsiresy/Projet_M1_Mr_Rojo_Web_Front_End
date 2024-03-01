import { Component, OnInit } from '@angular/core';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/firebaseConfig';
import { environment } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router'; // Importez NavigationEnd
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isProfileActive = false;
  isRdvActive = false;
  isList = false;
  isEmployeeActive = false;
  isAffiche = false;
  isClient = false;
  isEmploye = false;
  isServiceActive = false;
  isDepenseActive = false;
  isStatActive = false;

  title = 'Mean_mitambatra_frontend';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.requestPermission();
    this.listenForMessage();
    // Initialise le composant Toast
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));

    // Écouter les changements d'URL et mettre à jour les variables en conséquence
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        this.isProfileActive = currentUrl.includes('/profil');
        this.isRdvActive = currentUrl.includes('/rdv');
        this.isList = currentUrl.includes('/client/list');
        this.isEmployeeActive = currentUrl.includes('/user');
        this.isClient = currentUrl.includes('/client');
        this.isEmploye = currentUrl.includes('/employe');
        this.isServiceActive = currentUrl.includes('admin/services');
        this.isStatActive = currentUrl.includes('admin/statistiques');
        this.isDepenseActive = currentUrl.includes('admin/depenses');
        this.isAffiche =
          currentUrl !== '/' &&
          !currentUrl.includes('/login') &&
          !currentUrl.includes('/register') &&
          !currentUrl.includes('/client') &&
          !currentUrl.includes('/employe');
      }
    });
  }

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: environment.firebaseConfig.vapidKey,
      });
      console.log(token);
    } else if (permission === 'denied') {
      //notifications are blocked
      // alert('You denied for the notification');
    }
  }

  async listenForMessage() {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }

  logoutEmploye() {
    this.authService.logout();
    this.router.navigate(['/loginEmploye']);
  }

  logoutClient() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  logoutAdmin() {
    this.authService.logout();
    this.router.navigate(['/loginAdmin']);
  }
}
