import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfApplicationsComponent } from './components/list-of-applications/list-of-applications.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin/applications', component: ListOfApplicationsComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
