import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {
  listadoCategorias : any;
  dataSource:any;
  displayedColumns = ['id', 'nombre','categoriaid','acciones'];
  pageRegister = 5;

  cursos$!:Observable<Cursos[]>

  constructor(private categoriesService : CategoriasService, private cursosService : CursosService) {
  }

  ngOnInit(){

    this.cursos$ = this.cursosService.getAllCourses().pipe(catchError((err) => {
      return EMPTY;
    }));

    this.initSelect();
    //this.initeTable();
  }

  private initSelect(){
    this.categoriesService.getAllCategories().subscribe((resp) => {
      this.listadoCategorias = resp; });
  }

  private initeTable(){
    this.cursosService.getAllCourses().subscribe((resp) => {
      console.log(resp);

      this.dataSource = resp; });
  }

}
