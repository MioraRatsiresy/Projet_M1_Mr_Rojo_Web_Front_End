import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeComponent } from './employe/employe.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici
import { UserAddModalComponent } from './user/add/user-add-modal.component';
import { UserDetailsModalComponent } from './user/details/user-details-modal.component';
import { UserEditModalComponent } from './user/edit/user-edit-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfilComponent } from './employe/profil/profil.component';
import { CancelRdvModalComponent } from './employe/rdv/cancel/CancelRdvModalComponent.component';
import { AddUnavailabilityModalComponent } from './employe/indisponibilite/add-unavailability-modal.component';
import { RdvCalendarComponent } from './employe/rdv/rdv-calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeComponent,
    UserComponent,
    UserAddModalComponent,
    UserDetailsModalComponent,
    UserEditModalComponent,
    ProfilComponent,
    CancelRdvModalComponent,
    AddUnavailabilityModalComponent,
    RdvCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule, // Ajoutez FormsModule ici
    ToastrModule.forRoot(),
  ],
  providers: [], // Vous pouvez ajouter des fournisseurs ici si nécessaire
  bootstrap: [AppComponent]
})
export class AppModule { }
