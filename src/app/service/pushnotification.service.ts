import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { messaging } from '../../firebase/firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
import { base_url } from '../utils/url';
import { DeviceRegistryService } from './device/device-registry.service';

@Injectable({
  providedIn: 'root',
})
export class PushnotificationService {
  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: this.token || '', // Permettre l'accès depuis n'importe quelle origine
  });
  constructor(
    private http: HttpClient,
    private deviceFirebase: DeviceRegistryService
  ) {}

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token_registration = await getToken(messaging, {
        vapidKey: environment.firebaseConfig.vapidKey,
      });
      console.log(token_registration);
      this.deviceFirebase
        .device_register({ token_registration: token_registration })
        .subscribe({
          next: (res) => {
            console.log('Enregistrement de appareil effectué avec succès');
          },
          error: (error) => {
            console.error(error.error.message);
          },
        });
    } else if (permission === 'denied') {
      // alert("You denied for the notification");
    }
  }

  async listenForMessage() {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }
}
