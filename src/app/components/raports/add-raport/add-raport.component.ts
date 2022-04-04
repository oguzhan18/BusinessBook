import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Raport } from "../../../interfaces/Raport.interface";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MaterialService } from "src/app/services/material.service";
import { Material } from "../../../interfaces/Material.interface";
import { ProjectsService } from "../../../services/projects.service";
import { Project } from "../../../interfaces/Project.interface";
import { AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: "app-add-raport",
  templateUrl: "./add-raport.component.html",
  styleUrls: ["./add-raport.component.css"],
})
export class AddRaportComponent implements OnInit {
  @Input() projectId?: string;

  @Output() onAddRaport: EventEmitter<Raport> = new EventEmitter();

  addRaportForm: FormGroup = new FormGroup({});
  materialsParsed: Material[] = [];
  projects?: Project[];
  projectClient: string = "";
  team = "";
  materials?: string[];
  material = "";
  materialsFiltered: Material[] = [];
  clonedMaterials: Material[] = [];
  // Config for AngularEditorConfig
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Description...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
  };

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.getMaterials();
    this.getProjectAndClient();
    this.initializeForm();
    //Get the text from the materials (the name of the material for the select in html)
    this.materialService.getMaterialsFromFireBase().subscribe((materials) => {
      let mat = materials;
      this.materials = mat.map((el) => `${el["text"]}`);
    });
  }

  initializeForm(): void {
    this.addRaportForm = this.fb.group({
      projectAndClient: "",
      date: ["", Validators.required],
      team: ["", [Validators.required, Validators.minLength(3)]],
      materialsUsed: [],
      description: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    const newRaport = {
      projectAndClient: this.projectClient,
      date: this.addRaportForm.value.date,
      team: this.addRaportForm.value.team,
      materialsUsed: this.addRaportForm.value.materialsUsed,
      materialsQuantity: this.materialsFiltered,
      description: this.addRaportForm.value.description,
      projectId: this.projectId,
      bill: false,
    };

    this.getAllMaterialsQuantity(this.materialsFiltered);

    this.onAddRaport.emit(newRaport);
    this.addRaportForm.reset();
    for (let control in this.addRaportForm.controls) {
      this.addRaportForm.controls[control].setErrors(null);
    }
  }
  // Gets as args the old material and the new one ,
  //The service's method will make the math and update in Firebase

  updateMaterials(material: Material, newMaterial: Material): void {
    this.materialService.updateMaterialFromFirebase(material, newMaterial);
  }


//Get all the materials from firebase
  getMaterials() {
    this.materialService
      .getMaterialsFromFireBase()
      .subscribe(
        (materials) => (this.materialsParsed = materials as Material[])
      );
  }
//This method is used to get the project and the client 
//The id of the project will come from the @Input projectId;
//This will be added in the raport 
  getProjectAndClient() {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects.filter((project) => {
        project["id"] === this.projectId;
      }) as Project[];
      this.projectClient = `${projects[0]["client"]} : ${projects[0]["title"]}`;
    });
  }
//This method will use the materialsFiltered as arg
// And compares the ids of the "old material" and "new material" (to update quantities)
// Will call this.updateMaterials with these 2 args

  getAllMaterialsQuantity(old: Material[]) {
 
    for (let i = 0; i < old.length; i++) {
      for (let j = 0; j < this.clonedMaterials.length; j++) {
        if (this.materialsFiltered[i].id === this.clonedMaterials[j].id) {
          this.updateMaterials(
            this.clonedMaterials[j],
            this.materialsFiltered[i]
          );
        }
      }
    }
  }

//This method is making a clone of the materials we get from firebase 
// The clone is not a reference to the same object , is a reference 
// To a new object that is the same as materialsParsed

// After that is filtering the materials and populate materialsFiltered
// with the materials we pick in the form .

  filterMaterials() {
    this.clonedMaterials = this.materialsParsed.map((obj) => {
      return { ...obj };
    });
    this.materialsParsed.forEach((material) => {
      if (this.addRaportForm.value.materialsUsed.includes(material.text)) {
        this.materialsFiltered.push(material);
      }
    });
  }
}
