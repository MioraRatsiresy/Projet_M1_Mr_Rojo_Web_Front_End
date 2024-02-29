import { Component, OnInit } from '@angular/core';
import { PushnotificationService } from './service/pushnotification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Mean_mitambatra_frontend';
  constructor(private pushNotification: PushnotificationService){};
  ngOnInit() {
    // this.pushNotification.requestPermission();
    this.pushNotification.listenForMessage();
  }

}
