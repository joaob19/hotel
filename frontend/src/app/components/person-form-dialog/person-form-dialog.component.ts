import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Person} from "../../interfaces/person";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-person-form-dialog',
  templateUrl: './person-form-dialog.component.html',
  styleUrls: ['./person-form-dialog.component.css']
})
export class PersonFormDialogComponent {

  public loading = false;
  public form!: FormGroup

  constructor(
    private readonly dialogRef: MatDialogRef<PersonFormDialogComponent>,
    private readonly snackbar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly service: PersonService,
    @Inject(MAT_DIALOG_DATA) public data?: Person
  ) {
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize(): void {
    this.form = this.formBuilder.group({
      id: new FormControl<string>(''),
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      document: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      phone: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  private toggleLoader(): void {
    this.loading = !this.loading;
  }

  public async save(): Promise<void> {
    if (this.form.valid) {
      this.toggleLoader();
      const person = this.form.getRawValue() as Person;

      if(this.data){
        await this.service.updatePerson(person);
      }else{
        await this.service.savePerson(person);
      }
      const message = this.data ? 'Dados salvos com sucesso!' : 'Cadastro realizado com sucesso!';
      this.snackbar.open(message, 'OK', {duration: 3000});
      this.toggleLoader();
      this.dialogRef.close(true);
    }
  }

}
