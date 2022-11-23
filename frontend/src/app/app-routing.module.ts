import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {PersonsPageComponent} from "./pages/persons-page/persons-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'persons', component: PersonsPageComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
