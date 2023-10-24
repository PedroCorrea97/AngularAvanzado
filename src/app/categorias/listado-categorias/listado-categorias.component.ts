import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { categoriesDataSource } from './categorias.data';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.scss']
})
export class ListadoCategoriasComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : categoriesDataSource;
  pageRegister = 8;

  displayedColumns = ['id', 'nombre', 'descripcion'];
  constructor( private categoriesService: CategoriasService,
    private dialog: MatDialog,
    private snakcBar: MatSnackBar,
    private cdr: ChangeDetectorRef ) 
    { this.dataSource =  new categoriesDataSource(categoriesService) }

  ngAfterViewInit() { 
    this.paginator.page.pipe(tap(()=>{ 
      this.dataSource.getCategorias(this.paginator.pageIndex + 1, this.paginator.pageSize) })).subscribe();
  }

  ngOnInit() { this.chargeCat(); }
  private chargeCat() { this.dataSource.getCategorias(1, this.pageRegister); }
}