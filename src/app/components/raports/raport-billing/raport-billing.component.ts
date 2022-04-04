import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Raport } from "../../../interfaces/Raport.interface";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { RaportService } from "src/app/services/raport.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-raport-billing",
  templateUrl: "./raport-billing.component.html",
  styleUrls: ["./raport-billing.component.css"],
})
export class RaportBillingComponent implements OnInit {
  raportDetail: Raport[] = []
  numberLeft?: number;
  @Input() projectId?: string;
  @Output() onClick: EventEmitter<Raport> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private raportService: RaportService
  ) {}

  ngOnInit(): void {
    this.getRaport();

  }

  getRaport(): void {
    this.raportService.getRaports().subscribe((raports) => {
      this.raportDetail = raports as Raport[];
    });
  }
  getNumber(): void {
    this.numberLeft = this.raportDetail.length
  }

  markAsFinsihed(raport: Raport): void {
    this.onClick.emit(raport)
    this.raportService.updateRaport(raport)
  
  }
}
