import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RadioOption} from "../../../../interfaces/radio-option";
import {CheckIn} from "../../../../interfaces/check-in";
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.css']
})
export class ConsultListComponent implements AfterViewInit {

  @Input() public dataSource = new BehaviorSubject<CheckIn[]>([]);
  @Input() public filteredDataSource = new MatTableDataSource<CheckIn>([]);

  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
  }

  public form!: FormGroup;
  public options: RadioOption[] = [
    {value: 1, label: 'Pessoas ainda presentes'},
    {value: 2, label: 'Pessoas que já deixaram o hotel'}
  ];

  public displayedColumns = ['name', 'document', 'entryDate', 'exitDate', 'value'];

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.addListeners();
    this.filter();
  }

  private addListeners(): void {
    this.dataSource.subscribe((value) => {
      this.filteredDataSource.data = value;
      this.filter();
    })

    this.form.valueChanges.subscribe((_) => {
      this.filter();
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      status: new FormControl<number>(1),
    });
  }

  private filter(): void {
    const filteredValue = this.dataSource.value.slice();
    const status = this.form.get('status')!.value;

    this.filteredDataSource.data = filteredValue.filter((element) => {
      const exitDate = moment(new Date(element.exitDate));
      const currentDate = moment();

      if (status === 1) {
        return currentDate.isBefore(exitDate);
      } else {
        return currentDate.isAfter(exitDate)
      }
    });
  }

  public getFormattedIsoDate(isoDate: string): string {
    const date = new Date(isoDate);

    return moment(date).format('DD/MM/YYYY HH:mm:ss') ?? '';
  }

}
