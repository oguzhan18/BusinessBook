import { Component, OnInit, Output, EventEmitter  , Input } from '@angular/core';
import { Raport } from '../../interfaces/Raport.interface';
import { RaportService } from '../../services/raport.service';
@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.css'],
})
export class RaportsComponent implements OnInit {
  @Input() projectId?: string ;


  raports: Raport[] = [];

  projects?: string[];
  projectClient: string = '';
  team = '';
  materials?: string[];
  material = '';
  constructor(
    private raportService: RaportService
  ) {}

  ngOnInit(): void {
    this.raportService
      .getRaports()
      .subscribe((raports) => (this.raports = raports as Raport[]) );
  }
  addRaport(raport: Raport) {
    this.raportService
      .addRaport(raport)
  }
}
