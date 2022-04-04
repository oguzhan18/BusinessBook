import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { ButtonComponent } from "./components/shared/button/button.component";
import { MaterialsComponent } from "./components/materials/materials.component";
import { AddMaterialComponent } from "./components/materials/add-material/add-material.component";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { RaportsComponent } from "./components/raports/raports.component";
import { RequestsComponent } from "./components/requests/requests.component";
import { ProjectDetailComponent } from "./components/projects/project-detail/project-detail.component";
import { AddProjectComponent } from "./components/projects/add-project/add-project.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddRaportComponent } from "./components/raports/add-raport/add-raport.component";
import { RaportDetailComponent } from "./components/raports/raport-detail/raport-detail.component";
import { AddRequestComponent } from "./components/requests/add-request/add-request.component";
import { RequestItemComponent } from "./components/requests/request-item/request-item.component";
import { RaportBillingComponent } from "./components/raports/raport-billing/raport-billing.component";
import { AddRequestRaportComponent } from "./components/requests/add-request-raport/add-request-raport.component";
import { LoginComponent } from "./components/login/login.component";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import {MatDialogModule} from '@angular/material/dialog';

import { ProjectSearchPipe } from "./components/projects/project-search.pipe";
import { MaterialSearchPipe } from "./components/materials/material-search.pipe";

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HotToastModule } from "@ngneat/hot-toast";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { appRoutes } from "../app/routes/index";
import { DeleteRequestComponent } from './components/requests/delete-request/delete-request.component';
import { DeleteMaterialComponent } from './components/materials/delete-material/delete-material.component';

import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    MaterialsComponent,
    AddMaterialComponent,
    HomeComponent,
    ProjectsComponent,
    RaportsComponent,
    RequestsComponent,
    ProjectDetailComponent,
    AddProjectComponent,
    AddRaportComponent,
    RaportDetailComponent,
    AddRequestComponent,
    RequestItemComponent,
    RaportBillingComponent,
    AddRequestRaportComponent,
    LoginComponent,
    MaterialSearchPipe,
    ProjectSearchPipe,
    DeleteRequestComponent,
    DeleteMaterialComponent,
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    MatDialogModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
