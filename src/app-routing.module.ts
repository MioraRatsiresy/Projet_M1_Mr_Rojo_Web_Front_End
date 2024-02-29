import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './page/login-client/login-client.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginManagerComponent } from './page/login-manager/login-manager.component';
import { AccueilManagerComponent } from './page/accueil-manager/accueil-manager.component';
import { ServiceListComponent } from './component/service-list/service-list.component';
import { LoginEmployeComponent } from './page/login-employe/login-employe.component';
import { DiaryComponent } from './component/diary/diary.component';
import { UserComponent } from './page/user/user.component';
import { ListComponent } from './component/list/list.component';
import { PreferenceComponent } from './component/preference/preference.component';
import { ExpenseCrudComponent } from './component/expense-crud/expense-crud.component';
import { StatistiquesComponent } from './component/statistiques/statistiques.component';

const routes: Routes = [
    {
      path: '', component: LoginClientComponent
    },
    {
      path:'register', component: RegisterComponent
    },
    {
      path:'loginAdmin', component: LoginManagerComponent
    },
    {
      path:'login', component: LoginManagerComponent
    },
    {
      path: 'accueilAdmin', component: AccueilManagerComponent
    },
    {
      path: 'services', component: ServiceListComponent
    },
    { path: 'statistiques', component: StatistiquesComponent },
    {
      path: 'depenses', component: ExpenseCrudComponent
    },
    {
      path: 'loginEmploye', component: LoginEmployeComponent
    },{
        path: 'employe/rdv', component: DiaryComponent
    },
    {
      path: 'manager/user',component: UserComponent
    },
    {
      path:'clients/list',component: ListComponent
    },
    {
      path:'clients/preference',component: PreferenceComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
