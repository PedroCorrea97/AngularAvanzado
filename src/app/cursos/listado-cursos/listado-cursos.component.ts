import { EMPTY, Observable, Subject, Subscription, catchError, map, combineLatest, BehaviorSubject } from 'rxjs';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  selectedCategoryId: number | null;
  displayedColumns = ['id', 'nombre', 'categoriaId', 'precio','precioIVA','categoria', 'acciones'];
  pageRegister = 5;
  mensajeError = "";
  cursos$! : Observable<Cursos[]>;
  sub!:Subscription;
  listadoCat$! : Observable<any>;

  private categoriaSeleccionadaSubject = new BehaviorSubject<number>(0);
  categoriaSeleccionadaAction$ = this.categoriaSeleccionadaSubject.asObservable();

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
    this.cursos$ = combineLatest([
      this.cursosService.cursosConCategoria$,
      this.categoriaSeleccionadaAction$
    ]).pipe(
      map(([cursos,categoriaSeleccionadaId])=>
        cursos.filter((curso)=> categoriaSeleccionadaId !=0 ? 
        curso.categoriaId == categoriaSeleccionadaId:true)
      ),
      catchError(err=>{
        this.mensajeError = err;
        return EMPTY;
      })
    )
  }

  onselected (event){
    this.categoriaSeleccionadaSubject.next(event.value)
  }

  // onSelectChange(event: any) {
  //   this.selectedCategoryId = event.value;
  //   this.cursos$ = this.cursosService.cursosConCategoria$.pipe(
  //     catchError(err => { this.mensajeError = err; return EMPTY; }),
  //     map(cursos => {
  //       if (this.selectedCategoryId === null) { return cursos; }
  //       return cursos.filter(curso => curso.categoriaId === this.selectedCategoryId);
  //     })
  //   );
  // }
  

  deleteCategoria(categoria: Categoria) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, { width: '360', data: { message: '¿Desea eliminar la categoria? ' + categoria.nombre } })
    dialogRef.afterClosed().subscribe(resp => {
      if (resp == 'Si') {
        this.cursosService.delete(categoria.id).subscribe(resp => { this.chargeCourses(); this.snackBar.open(' La categoria fue elimnada con exito ', '', { duration: 3000 }); });
      } this.cdr.detectChanges();
    })
  }
}