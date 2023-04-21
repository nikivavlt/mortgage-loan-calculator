import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListOfApplicationsComponent } from './components/list-of-applications/list-of-applications.component';
import { MainComponent } from './components/main/main.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'top-secret', component: AuthorizationComponent, pathMatch: "full"},
  {path: 'admin/applications', component: ListOfApplicationsComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
