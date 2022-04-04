import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaterialService } from "../../../services/material.service";
import { Material } from "../../../interfaces/Material.interface";

@Component({
  selector: "app-delete-material",
  templateUrl: "./delete-material.component.html",
  styleUrls: ["./delete-material.component.css"],
})
export class DeleteMaterialComponent implements OnInit {
  constructor(
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) public data: DialogMaterial
  ) {}

  ngOnInit(): void {}
  deleteMaterialFromFirebBase(material: Material) {
    this.materialService.deleteMaterialFromFirebBase(material);
  }
}
export interface DialogMaterial {
  material: Material;
}
