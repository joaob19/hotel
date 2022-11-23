import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HomePageModule} from "./pages/home-page/home-page.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {PersonsModule} from "./pages/persons-page/persons.module";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatPaginatorTranslateService} from "./services/mat-paginator-translate.service";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HomePageModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    PersonsModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorTranslateService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
