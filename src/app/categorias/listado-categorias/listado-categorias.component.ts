import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Categoria } from 'src/app/models/categoria';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { EMPTY, Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.scss']
})
export class ListadoCategoriasComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  categorias$ : Observable<Categoria[]>;
  mensajeError = '';

  // Columnas tabla categorias
  displayedColumns = ['id', 'nombre','descripcion','acciones'];
  pageRegister = 5;
  
  constructor(
    private categoriesService : CategoriasService,
    private cdr: ChangeDetectorRef,
    private dialog : MatDialog,
    private snackBar : MatSnackBar){
      
    }

    ngOnInit() {
      this.categorias$ = this.categoriesService.getAllCategories().pipe(
        catchError(err => {
          this.mensajeError = err;
          return EMPTY;
        })
      );
    }

    private chargeCat() {
      this.categorias$ = this.categoriesService.getAllCategories().pipe(
        catchError(err => {
          this.mensajeError = err;
          return EMPTY;
        })
      );
    }

    deleteCategoria(categoria: Categoria){
      const dialogRef = this.dialog.open(MensajeConfirmacionComponent, { width: '360', data:{ message: '¿Desea eliminar la categoria? ' + categoria.nombre} })
      dialogRef.afterClosed().subscribe( resp => { if (resp == 'Si') { this.categoriesService.delete(categoria.id).subscribe ( resp => 
        { this.chargeCat(); this.snackBar.open(' La categoria fue elimnada con exito ',  '', { duration:3000}); }); } this.cdr.detectChanges(); } )
    }
}