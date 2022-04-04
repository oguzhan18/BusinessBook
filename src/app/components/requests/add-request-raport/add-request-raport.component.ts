import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Raport } from "../../../interfaces/Raport.interface";
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { MaterialService } from "src/app/services/material.service";
import { Material } from "../../../interfaces/Material.interface";
import { RequestService } from '../../../services/request.service';
import {Request} from '../../../interfaces/Request.interface';
import {AngularEditorConfig} from '@kolkov/angular-editor'

@Component({
  selector: 'app-add-request-raport',
  templateUrl: './add-request-raport.component.html',
  styleUrls: ['./add-request-raport.component.css']
})
export class AddRequestRaportComponent implements OnInit {
  @Input() requestId?: string;

  @Output() onAddRaportRequest: EventEmitter<Raport> = new EventEmitter();


  addRaportRequestForm: FormGroup = new FormGroup({});
  materialsParsed: Material[] = [];
  requests?: Request[] ;
  projectClient?: string;
  team = "";
  materials?: string[];
  material = "";
  materialsFiltered: Material[] = [];
  clonedMaterials: Material[] = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Descriere...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
  };

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private requestService: RequestService
  ) {}

 
  ngOnInit(): void {
 
    this.getMaterials();
    this.getClient();
    this.initializeForm();
    this.materialService.getMaterialsFromFireBase().subscribe((materials) => {
      let mat = materials;
      this.materials = mat.map((el) => `${el["text"]}`);
    });
  }

  initializeForm(): void {
    this.addRaportRequestForm = this.fb.group({
      date: ["", Validators.required],
      team: ["", Validators.required],
      materialsUsed: [],
      description: ""
    });
  }

  onSubmit() {
 
    const newRaport = {
      projectAndClient: this.projectClient,
      date: this.addRaportRequestForm.value.date,
      team: this.addRaportRequestForm.value.team,
      materialsUsed: this.addRaportRequestForm.value.materialsUsed,
      materialsQuantity: this.materialsFiltered,
      description: this.addRaportRequestForm.value.description,
      requestId: this.requestId,
      bill: false
    };

    this.getAllMaterialsQuantity(this.materialsFiltered);

    this.onAddRaportRequest.emit(newRaport);
    this.addRaportRequestForm.reset();
    for (let control in this.addRaportRequestForm.controls) {
      this.addRaportRequestForm.controls[control].setErrors(null);
    }
  }

  updateMaterials(material: Material, newMaterial: Material): void {
    this.materialService.updateMaterialFromFirebase(material,newMaterial)
  }

  reloadPage() {
    window.location.reload();
 }

  getMaterials() {
    this.materialService
      .getMaterialsFromFireBase()
      .subscribe((materials) => (this.materialsParsed = materials as Material[]));
  }

  getClient() {
    this.requestService.getRequests().subscribe((requests)=> {
      let request = requests.find((r)=> r["id"] === this.requestId)
     this.projectClient = request?.["client"]
      



    })
  }

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

  filterMaterials() {
    this.clonedMaterials = this.materialsParsed.map((obj) => {
      return { ...obj };
    });
    this.materialsParsed.forEach((material) => {
      if (this.addRaportRequestForm.value.materialsUsed.includes(material.text)) {
        this.materialsFiltered.push(material);
      }
    });
  }
}
