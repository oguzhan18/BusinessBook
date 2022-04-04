import { Component, OnInit } from "@angular/core";
import { Project } from "../../interfaces/Project.interface";
import { ProjectsService } from "../../services/projects.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  projectName = "";
  projects: Project[] = [];

  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.projectService
      .getProjects()
      .subscribe((projects) => (this.projects = projects as Project[]));
  }
  //Will get the "project" from the EventEmitter in AddProjectComponent
  addProject(project: Project) {
    this.projectService.addProject(project);
  }
}
