import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, EMPTY,  catchError, combineLatest, map} from "rxjs";
import { CategoriasService } from "src/app/services/categorias.service";
import { CursosService } from "src/app/services/cursos.service";

@Component({
  selector: "app-lista-cursos",
  templateUrl: "./lista-cursos.component.html",
  styleUrls: ["./lista-cursos.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaCursosComponent {
  private cursosService = inject(CursosService);
  private categoriasService=inject(CategoriasService);

  private categoriaSeleccionadaSubject = new BehaviorSubject<number>(0);
  categoriaSeleccionadaAction$ = this.categoriaSeleccionadaSubject.asObservable();

  tituloPagina = "Lista de Cursos";
  mensajeError = "";  
  categoriaSeleccionadaId=1;

  categorias$ = this.categoriasService.categorias$;

  cursos$ = combineLatest([
    this.cursosService.cursosConCategorias$,
    this.categoriaSeleccionadaAction$
  ]).pipe(
    map(([cursos,categoriaSeleccionadaId])=>
      cursos.filter((curso)=>categoriaSeleccionadaId!=0?
              curso.categoriaId==categoriaSeleccionadaId:true)
    ),
    catchError(err=>{
      this.mensajeError = err;
      return EMPTY;
    })
  );

  onSelected(categoriaId: number): void {        
    this.categoriaSeleccionadaSubject.next(categoriaId);
  }

}
