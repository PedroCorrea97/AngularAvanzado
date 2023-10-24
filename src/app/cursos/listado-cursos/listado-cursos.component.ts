import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, Subscription, catchError, map } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  selectedCategoryId: number | null;
  displayedColumns = ['id', 'nombre', 'categoriaId', 'precio','precioIVA', 'acciones'];
  pageRegister = 5;
  mensajeError = "";
  cursos$! : Observable<Cursos[]>;
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
    this.chargeCourses();
  }

  private initSelect() {
    this.listadoCat$ = this.categoriesService.categoria$;
  }

  private chargeCourses() {
    this.cursos$ = this.cursosService.cursos$;
  }

  onSelectChange(event: any) {
    this.selectedCategoryId = event.value;
    this.cursos$ = this.cursosService.cursos$.pipe(
      catchError(err => {
        this.mensajeError = err;
        return EMPTY;
      }),
      map(cursos => {
        if (this.selectedCategoryId === null) {
          return cursos;
        }
        return cursos.filter(curso => curso.categoriaId === this.selectedCategoryId);
      })
    );
  }
  

  deleteCategoria(categoria: Categoria) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, { width: '360', data: { message: '¿Desea eliminar la categoria? ' + categoria.nombre } })
    dialogRef.afterClosed().subscribe(resp => {
      if (resp == 'Si') {
        this.cursosService.delete(categoria.id).subscribe(resp => { this.chargeCourses(); this.snackBar.open(' La categoria fue elimnada con exito ', '', { duration: 3000 }); });
      } this.cdr.detectChanges();
    })
  }
}
