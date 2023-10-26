import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Cursos } from 'src/app/models/cursos';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss'],
})
export class DetalleCursoComponent {
  @Input() curso!:Cursos;
}
