import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Person} from "../../../../interfaces/person";
import {PersonFormDialogComponent} from "../../../../components/person-form-dialog/person-form-dialog.component";
import {PersonService} from "../../../../services/person.service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {

  @Input() persons: Person[] = [];

  @Output() onEdit = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();

  public displayedColumns: string[] = [
    'name', 'document', 'phone', 'edit', 'remove'
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly service: PersonService,
    private readonly snackbar: MatSnackBar
  ) {
  }

  public edit(person: Person): void {
    const dialogRef = this.dialog.open(PersonFormDialogComponent, {
      width: '500px',
      height: '400px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onEdit.emit();
      }
    });
  }

  public remove(id: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Deseja remover essa pessoa?'
      }
    }).afterClosed().subscribe(async (value: boolean | undefined) => {
      if (value) {
        await this.service.removePerson(id);
        this.snackbar.open(
          'Pessoa removida com sucesso!', 'OK', {duration: 3000}
        );
        this.onRemove.emit();
      }
    });
  }

}
