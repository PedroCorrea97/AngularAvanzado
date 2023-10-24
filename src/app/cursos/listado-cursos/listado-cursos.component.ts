import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Categoria } from 'src/app/models/categoria';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { CursosService } from 'src/app/services/cursos/cursos.service';
@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  listadoCategorias: any
  // Columnas tabla categorias
  displayedColumns = ['id', 'nombre', 'categoriaId', 'acciones'];
  pageRegister = 5;

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
    this.categoriesService.getAllCategories().subscribe((resp) => {
      this.listadoCategorias = resp;
    });
  }

  private chargeCourses() {
    this.cursosService.getAllCourses().subscribe((resp) => { this.dataSource = resp; });
  }

  onSelectChange(event){

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