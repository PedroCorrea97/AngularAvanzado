import { EMPTY, Observable, Subject, Subscription, catchError, map, combineLatest, BehaviorSubject, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Categoria } from 'src/app/models/categoria';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { Cursos } from 'src/app/models/cursos';
@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoCursosComponent implements OnInit{
    private categoriaSeleccionadaSubject = new BehaviorSubject<number>(null);
    categoriaSeleccionadaAction$ = this.categoriaSeleccionadaSubject.asObservable();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  selectedCategoryId: number | null;
  displayedColumns = ['id', 'nombre', 'precio','precioIVA','categoria'/* , 'acciones' */];
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

  sub!:Subscription;
  listadoCat$! : Observable<any>;

  constructor(
    private cursosService: CursosService,
    private categoriesService: CategoriasService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    this.initSelect();
  }

  private initSelect() {
    this.listadoCat$ = this.categoriesService.categoria$;
  }

  onSelectChange (event){
    this.categoriaSeleccionadaSubject.next(event.value)
  }
  

  deleteCategoria(categoria: Categoria) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, { width: '360', data: { message: '¿Desea eliminar la categoria? ' + categoria.nombre } })
    dialogRef.afterClosed().subscribe(resp => {
      if (resp == 'Si') {
        this.cursosService.delete(categoria.id).subscribe(resp => { this.snackBar.open(' La categoria fue elimnada con exito ', '', { duration: 3000 }); });
      } this.cdr.detectChanges();
    })
  }
}