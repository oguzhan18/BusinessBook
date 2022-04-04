import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../interfaces/Project.interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectsService } from '../../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  projectDetail?: Project;
  @Input() project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject();
  } 
  getProject(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService
      .getProjects()
      .subscribe(
        (projects) => (this.projectDetail = projects.find((p) => p['id'] === id) as Project)
      );
  }
  hasRoute(route: string) {
    return this.router.url === route;
  }
  hasRouteDetail(route: string) {
    return this.router.url !== route;
  }
}
