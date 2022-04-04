import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { MaterialsComponent } from "../components/materials/materials.component";
import { ProjectDetailComponent } from "../components/projects/project-detail/project-detail.component";
import { ProjectsComponent } from "../components/projects/projects.component";
import { RaportBillingComponent } from "../components/raports/raport-billing/raport-billing.component";
import { RequestItemComponent } from "../components/requests/request-item/request-item.component";
import { RequestsComponent } from "../components/requests/requests.component";
import { AuthGuard } from "../components/shared/security/auth.guard";


export const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "materials", component: MaterialsComponent , canActivate: [AuthGuard]  },
  { path: "projects", component: ProjectsComponent, canActivate: [AuthGuard]  },
  { path: "requests", component: RequestsComponent, canActivate: [AuthGuard]  },
  { path: "project/:id", component: ProjectDetailComponent ,canActivate: [AuthGuard]  },
  { path: "requests/:id", component: RequestItemComponent, canActivate: [AuthGuard]  },
  { path: "billing", component: RaportBillingComponent ,canActivate: [AuthGuard] },
];
