import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListOfApplicationsComponent } from './components/list-of-applications/list-of-applications.component';
import { MainComponent } from './components/main/main.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { OnlyUserGuard } from './guards/only-user.guard';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'top-secret', component: AuthenticationComponent, pathMatch: "full"},
  {path: 'admin/applications', component: ListOfApplicationsComponent, canActivate: [OnlyUserGuard], pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
