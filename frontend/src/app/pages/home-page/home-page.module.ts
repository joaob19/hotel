import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {MatButtonModule} from "@angular/material/button";
import {CheckInFormComponent} from './components/check-in-form/check-in-form.component';
import {ConsultListComponent} from './components/consult-list/consult-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {PersonFormDialogModule} from "../../components/person-form-dialog/person-form-dialog.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    HomePageComponent,
    CheckInFormComponent,
    ConsultListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    PersonFormDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(maskConfigFunction)
  ]
})
export class HomePageModule {
}
