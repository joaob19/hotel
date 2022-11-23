import {Component, OnInit} from '@angular/core';
import {Person} from "../../interfaces/person";
import {PersonFormDialogComponent} from "../../components/person-form-dialog/person-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.css']
})
export class PersonsPageComponent implements OnInit{

  public persons: Person[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly service: PersonService
  ) {
  }

  ngOnInit() {
    this.getPersons().then();
  }

  public async getPersons(): Promise<void>{
    const response = await this.service.getPersons();
    this.persons = response.slice();
  }

  public addPerson(): void{
    const dialogRef = this.dialog.open(PersonFormDialogComponent, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPersons().then();
    });
  }

}
