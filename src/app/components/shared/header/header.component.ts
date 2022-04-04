import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { Subscription } from 'rxjs';
import { Raport } from "../../../interfaces/Raport.interface";
import { RaportService } from "src/app/services/raport.service";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'BusinessBook';
  showAddMaterial: boolean = false;
  subscription?: Subscription;
  raportDetail: Raport[] = []
  dateVal  =new Date();

  constructor(private uiService: UiService, public authService: AuthenticationService, private router: Router,  private raportService: RaportService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddMaterial = value);
  }

  ngOnInit(): void {
    this.getRaport();

  }

  toggleAddMaterial() {
    this.uiService.toggleAddMaterial();
  }
  getRaport(): void {
    this.raportService.getRaports().subscribe((raports) => {
      this.raportDetail = raports.filter((raport)=> raport['bill'] === false) as Raport[]
    });
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login'])
    })
  }

  isLoggedIn():boolean {
    
    return (localStorage.getItem('user') === null)? false:true;
  }
}
