import {Component, ViewChild} from '@angular/core';
import {DrawerOption} from "./interfaces/drawer-option";
import {Router} from "@angular/router";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    private readonly router: Router
  ) {
  }

  public drawerOptions: DrawerOption[] = [
    {icon: 'home', label: 'Home', route: '/'},
    {icon: 'persons', label: 'Pessoas', route: '/persons'}
  ];

  public navigate(route: string): void{
    this.router.navigate([`/${route}`]).then(r => {
      this.drawer?.close();
    });
  }

}
