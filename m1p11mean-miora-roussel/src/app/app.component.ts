import { Component, OnInit } from '@angular/core';
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import { environment } from '../environments/environment';
import { Toast } from 'bootstrap'; // Importez la classe Toast depuis Bootstrap
import { Router, NavigationEnd } from '@angular/router'; // Importez NavigationEnd

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isProfileActive = false;
  isRdvActive = false;
  isEmployeeActive = false;

  title = 'Mean_mitambatra_frontend';
  constructor(private router: Router){};
  ngOnInit() {
    this.requestPermission();
    this.listenForMessage();
    // Initialise le composant Toast
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function (toastEl) {
      return new Toast(toastEl);
    });

    // Écouter les changements d'URL et mettre à jour les variables en conséquence
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        this.isProfileActive = currentUrl.includes('/profil');
        this.isRdvActive = currentUrl.includes('/rdv');
        this.isEmployeeActive = currentUrl.includes('/user');
      }
    });
  }

  async requestPermission(){
    const permission = await Notification.requestPermission();
    if(permission === "granted"){
      const token = await getToken(messaging,{
        vapidKey: environment.firebaseConfig.vapidKey
      });
      console.log(token);
    }else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  async listenForMessage(){
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }
}
