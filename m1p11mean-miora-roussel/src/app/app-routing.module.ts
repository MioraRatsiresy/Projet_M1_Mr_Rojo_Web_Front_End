import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
import { UserComponent } from './user/user.component';
import { RdvCalendarComponent } from './employe/rdv/rdv-calendar.component';
import { ProfilComponent } from './employe/profil/profil.component';

const routes: Routes = [
  { path: 'employe', component: EmployeComponent },
  { path: 'user', component: UserComponent },
  { path: 'rdv', component: RdvCalendarComponent },
  { path: 'profil', component: ProfilComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
