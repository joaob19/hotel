import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsPageComponent } from './persons-page.component';
import {PersonFormDialogModule} from "../../components/person-form-dialog/person-form-dialog.module";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {PersonListComponent} from "./components/person-list/person-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ConfirmationDialogModule} from "../../components/confirmation-dialog/confirmation-dialog.module";

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    PersonsPageComponent,
    PersonListComponent,
  ],
  imports: [
    CommonModule,
    PersonFormDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ConfirmationDialogModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ]
})
export class PersonsModule { }
