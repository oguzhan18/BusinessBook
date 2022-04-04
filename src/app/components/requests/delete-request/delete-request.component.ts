import { Component, Inject, Input, OnInit } from '@angular/core';
import { RequestService } from "../../../services/request.service";
import { Request } from "../../../interfaces/Request.interface";
import {  MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request.component.html',
  styleUrls: ['./delete-request.component.css']
})

export class DeleteRequestComponent implements OnInit {

  constructor(private requestService: RequestService,@Inject(MAT_DIALOG_DATA)  public data: DialogRequest) { }

  ngOnInit(): void {
  }
  deleteRequest(request: Request): void {
    this.requestService.deleteRequest(request);
  }
}
export interface DialogRequest {
  request: Request;
}