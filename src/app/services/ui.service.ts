import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
    private showAddMaterial: boolean = false;
    private subject = new Subject<any>();

  constructor() { }

  toggleAddMaterial(): void {
    this.showAddMaterial = !this.showAddMaterial;
    this.subject.next(this.showAddMaterial);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

}
