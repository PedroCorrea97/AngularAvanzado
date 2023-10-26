import { BehaviorSubject, EMPTY, Observable, Subject, Subscription, catchError, combineLatest, map, startWith, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatPaginator } from '@angular/material/paginator';
import { CursosService } from 'src/app/services/cursos/cursos.service';
@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoCursosComponent {
  private categoriaSeleccionadaSubject = new BehaviorSubject<number>(null);
  categoriaSeleccionadaAction$ = this.categoriaSeleccionadaSubject.asObservable();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  selectedCategoryId: number | null;
  displayedColumns = ['id', 'nombre', 'categoria', 'precio', 'precioIVA'/* , 'acciones' */];
  pageRegister = 5;
  mensajeError = "";
  cursos$ = this.categoriaSeleccionadaAction$.pipe(
    switchMap((categoriaSeleccionadaId) =>
      this.cursosService.cursosConCategoria$.pipe(
        map((cursos) => cursos.filter((curso) => categoriaSeleccionadaId ? curso.categoriaId === categoriaSeleccionadaId : true)),
        catchError((err) => { this.mensajeError = err; return EMPTY; })
      )
    )
  );

  sub!: Subscription;
  listadoCat$!: Observable<any>;



  constructor(
    private cursosService: CursosService,
    private categoriesService: CategoriasService) { }

  ngOnInit() {
    this.initSelect();
  }

  private initSelect() {
    this.listadoCat$ = this.categoriesService.categoria$;
  }


  onSelectChange(event: any) {
    this.categoriaSeleccionadaSubject.next(event.value);
  }

}