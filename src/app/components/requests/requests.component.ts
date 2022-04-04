import { Component, OnInit, Input } from '@angular/core';
import {Request} from '../../interfaces/Request.interface';
import {RequestService} from '../../services/request.service'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @Input() receivedRequests?: Request[];
  requests: Request[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe((requests)=> (this.requests = requests as Request[]));
  
    
  }

  addRequest(request: Request) {
    this.requestService
      .addRequest(request)
  }
}
