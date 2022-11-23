import {Component, OnInit} from '@angular/core';
import {CheckIn} from "../../interfaces/check-in";
import {CheckInService} from "../../services/check-in.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public dataSource = new BehaviorSubject<CheckIn[]>([]);

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly service: CheckInService
  ) {
  }

  ngOnInit() {
    this.loadData().then();
  }

  public async loadData(): Promise<void> {
    try{
      const data = await this.service.getCheckinData();
      this.dataSource.next(data);
    }catch(e){
      if(e){
        this.snackbar.open(
          e.toString(), 'OK', {duration: 3000}
        );
      }
    }
  }

}
