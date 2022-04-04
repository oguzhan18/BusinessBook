import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Request} from '../interfaces/Request.interface';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient, private firestore: Firestore) { }

  getRequests(): Observable<DocumentData[]> {
    const requestRef = collection(this.firestore,'requests');
    return collectionData(requestRef, { idField: "id" })

  }

  deleteRequest(request: Request){
    const requestDocRef = doc(this.firestore, `requests/${request.id}`);
    return deleteDoc(requestDocRef)
  }

  addRequest(request: Request){
    const requestRef = collection(this.firestore,'requests');
    return addDoc(requestRef, request)
  }


}
