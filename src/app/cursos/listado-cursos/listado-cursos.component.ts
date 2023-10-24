import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cursos$ : Observable<Cursos[]>;
  listadoCategorias : any;
  selectedCategoryId: number | null;
  mensajeError = '';

  // Columnas tabla categorias
  displayedColumns = ['id', 'nombre','categoriaId','precio','acciones'];
  pageRegister = 5;
  
  constructor(
    private coursesService : CursosService,
    private categoriesService : CategoriasService,
    private cdr: ChangeDetectorRef,
    private dialog : MatDialog,
    private snackBar : MatSnackBar){
      
    }
    ngOnInit() {
      this.cursos$ = this.coursesService.getAllCourses().pipe(
        catchError(err => {
          this.mensajeError = err;
          return EMPTY;
        })
      );
      this.initSelect();
    }

    private initSelect(){
      this.categoriesService.getAllCategories().subscribe((resp) => {
        this.listadoCategorias = resp; });
    }

    onSelectChange(event: any) {
      this.selectedCategoryId = event.value;
      this.cursos$ = this.coursesService.getAllCourses().pipe(
        catchError(err => {
          this.mensajeError = err;
          return EMPTY;
        }),
        map((cursos : any) => {
          if (this.selectedCategoryId === null) {
            return cursos;
          }
          return cursos.filter(curso => curso.categoriaId === this.selectedCategoryId);
        })
      );
    }

}
