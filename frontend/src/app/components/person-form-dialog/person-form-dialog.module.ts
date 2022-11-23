import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonFormDialogComponent} from './person-form-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    PersonFormDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  exports: [
    PersonFormDialogComponent
  ]
})
export class PersonFormDialogModule { }
