import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Person} from "../../../../interfaces/person";
import {PersonService} from "../../../../services/person.service";
import {CheckIn} from "../../../../interfaces/check-in";
import {CheckInService} from "../../../../services/check-in.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonFormDialogComponent} from "../../../../components/person-form-dialog/person-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css']
})
export class CheckInFormComponent implements OnInit {

  @Output() onCheckIn = new EventEmitter<void>();

  public form!: FormGroup;
  private persons: Person[] = [];
  public filteredPersons!: Observable<Person[]>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly checkInService: CheckInService,
    private readonly personService: PersonService,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getPersons().then();
    this.buildForm();
    this.filteredPersons = this.form.get('person')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  public async getPersons(): Promise<void> {
    const response = await this.personService.getPersons();
    this.persons = response.slice();
  }

  private filter(value: string | Person): Person[] {
    return this.persons.filter(person => {
      let filterValue = '';

      filterValue = typeof value !== 'string' ? value.name : value;

      const hasMatch = (s: string) => {
        return s.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
      }

      return hasMatch(person.name) || hasMatch(person.document);
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: new FormControl<string>(''),
      entryDate: new FormControl<string>(
        '',
        [Validators.required]
      ),
      exitDate: new FormControl<string>(
        '',
        [Validators.required]
      ),
      person: new FormControl<Person | null>(
        null,
        [Validators.required]
      ),
      totalValue: new FormControl<number>(0.00),
      haveVehicle: new FormControl<boolean>(false),
    });
  }

  public async submit(): Promise<void> {
    let message = 'Check-in realizado com sucesso!';
    try{
      const data = this.form.getRawValue() as CheckIn;
      await this.checkInService.doCheckIn(data);
      this.form.reset();
      this.form.markAsPristine();
      this.onCheckIn.emit();
    }catch (error){
      if(error){
        message = error?.toString();
      }
    }finally {
      this.snackbar.open(
        message, 'OK', {duration: 3000}
      );
    }
  }

  public displayPerson(person?: Person): string {
    if (!person) {
      return '';
    }

    return person.name;
  }

  public addPerson(): void {
    const dialogRef = this.dialog.open(PersonFormDialogComponent, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPersons().then();
      }
    });
  }

}
