import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './interceptor/AuthInterceptor';
import { CorsInterceptor } from './interceptor/cors-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginClientComponent } from './page/login-client/login-client.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginManagerComponent } from './page/login-manager/login-manager.component';
import { AccueilManagerComponent } from './page/accueil-manager/accueil-manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServiceDialogComponent } from './component/service-dialog/service-dialog.component';
import { ServiceListComponent } from './component/service-list/service-list.component';
import { LoginEmployeComponent } from './page/login-employe/login-employe.component';
import { DiaryComponent } from './component/diary/diary.component';
import { CancelRdvModalComponent } from './component/cancel-rdv-modal/cancel-rdv-modal.component';
import { AddUnavailabilityModalComponent } from './component/add-unavailability-modal/add-unavailability-modal.component';
import { UserAddModalComponent } from './component/user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from './component/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './component/user-delete-modal/user-delete-modal.component';
import { UserDetailsModalComponent } from './component/user-details-modal/user-details-modal.component';
import { UserComponent } from './page/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule,FullCalendarComponent } from '@fullcalendar/angular';
import { ListComponent } from './component/list/list.component';
import { PreferenceComponent } from './component/preference/preference.component';
import { FileDragNDropDirective } from './component/service-dialog/file-drag-n-drop.directive';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { ExpenseCrudComponent } from './component/expense-crud/expense-crud.component';
import { StatistiquesComponent } from './component/statistiques/statistiques.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpenseDialogComponent } from './component/expense-dialog/expense-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginClientComponent,
    RegisterComponent,
    LoginManagerComponent,
    AccueilManagerComponent,
    ServiceDialogComponent,
    ServiceListComponent,
    LoginEmployeComponent,
    DiaryComponent,
    CancelRdvModalComponent,
    AddUnavailabilityModalComponent,
    UserAddModalComponent,
    UserEditModalComponent,
    UserDeleteModalComponent,
    UserDetailsModalComponent,
    UserComponent,
    ListComponent,
    PreferenceComponent,
    FileDragNDropDirective,
    ExpenseCrudComponent,
    StatistiquesComponent,
    ExpenseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    NgApexchartsModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
