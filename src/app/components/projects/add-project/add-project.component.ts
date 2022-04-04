import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Project } from "../../../interfaces/Project.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AngularEditorConfig} from '@kolkov/angular-editor'

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
})
export class AddProjectComponent implements OnInit {
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter();

  addProjectForm: FormGroup = new FormGroup({});

  statusType =[ "done", "in progress", "offer" ];
  //Configuration for AngularEditorConfig
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'description...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeFrom();
  }

  initializeFrom(): void {
    this.addProjectForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      client: ["", [Validators.required, Validators.minLength(3)]],
      location: ["", [Validators.required, Validators.minLength(3)]],
      status: ["", Validators.required],
      date: ["", Validators.required],
      description: ["", [Validators.required, Validators.minLength(3)]],
    });
  }
  //We build the method to submit the project to Firebase using 
  // EventEmitter to the ProjectsComponent

  onSubmit() {
    const newProject = {
      title: this.addProjectForm.value.title,
      client: this.addProjectForm.value.client,
      location: this.addProjectForm.value.location,
      status: this.addProjectForm.value.status,
      date: this.addProjectForm.value.date,
      description: this.addProjectForm.value.description,
    };
    this.onAddProject.emit(newProject);

    this.addProjectForm.reset();
    for (let control in this.addProjectForm.controls) {
      this.addProjectForm.controls[control].setErrors(null);
    }
  }
}
