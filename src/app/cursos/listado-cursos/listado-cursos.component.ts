import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource : any;

  // Columnas tabla categorias
  displayedColumns = ['id', 'nombre','descripcion','acciones'];
  pageRegister = 5;
  
  constructor(
    private coursesService : CursosService,
    private cdr: ChangeDetectorRef,
    private dialog : MatDialog,
    private snackBar : MatSnackBar){
      
    }
    ngOnInit() {
      this.chargeCat();
    }
    
    private chargeCat() { this.coursesService.getAllCourses().subscribe((resp) => {
      this.dataSource = resp; });
    }

}
