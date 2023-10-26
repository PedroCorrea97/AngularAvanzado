import { Component, Input,ChangeDetectionStrategy } from "@angular/core";
import { Curso } from "src/app/models/curso.model";

@Component({
  selector: "app-detalle-curso",
  templateUrl: "./detalle-curso.component.html",
  styleUrls: ["./detalle-curso.component.scss"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DetalleCursoComponent {
  @Input() curso!:Curso;
}
