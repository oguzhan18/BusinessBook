import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project.interface';
import { addDoc, collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getProjects(): Observable<DocumentData[]> {
    const projectRef = collection(this.firestore, 'projects');
    return collectionData(projectRef,{ idField: "id"});
  }

  addProject(project: Project) {
    const projectRef = collection(this.firestore, 'projects');
    return addDoc(projectRef,project)
   
  }
}
