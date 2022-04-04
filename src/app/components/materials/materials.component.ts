import { Component, OnInit, Output, EventEmitter } from "@angular/core";
("@angular/core");
import { MaterialService } from "src/app/services/material.service";
import { Material } from "../../interfaces/Material.interface";
import { DeleteMaterialComponent } from "./delete-material/delete-material.component";
import { MatDialog,} from "@angular/material/dialog";
import {TooltipPosition} from '@angular/material/tooltip';


@Component({
  selector: "app-materials",
  templateUrl: "./materials.component.html",
  styleUrls: ["./materials.component.css"],
})
export class MaterialsComponent implements OnInit {
  materialName: string = "";
  materials: Material[] = [];
  editMode = false;
  editId = "";

  constructor(
    private materialService: MaterialService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.materialService.getMaterialsFromFireBase().subscribe((materials) => {
      this.materials = materials as Material[];
    });
  }
  addMaterialtoFireBase(material: Material) {
    this.materialService.addMaterialtoFireBase(material);
  }
  openDialog(material: Material) {
    this.dialog.open(DeleteMaterialComponent, {
      data: {
        material: material,
      },
    });
  }

  editMaterialFromFirebBase(material: Material) {
    this.materialService.editMaterialFromFirebBase(material);
  }

  enterEditMode(id: string) {
    this.editId = id;
    this.editMode = true;
  }

  compareId(id: string, editId: string): boolean {
    return id === editId;
  }

  exitEditMode(material: Material): void {
    this.editMaterialFromFirebBase(material);
    this.editMode = false;
  
  }
}
