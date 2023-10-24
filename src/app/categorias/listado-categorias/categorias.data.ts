import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Categorias } from "src/app/models/categorias";
import { CategoriasService } from "src/app/services/categorias/categorias.service";


export class categoriesDataSource{
    private categoriesSubject = new BehaviorSubject<Categorias[]>([]);
    private totalCountSubject = new BehaviorSubject<number | undefined>(0);
    public categories$ = this.categoriesSubject.asObservable();
    public totalCounts$ = this.totalCountSubject.asObservable();
    constructor( private categoriesService: CategoriasService ){ }

    connect(collectionViewer: CollectionViewer){ return this.categories$; }
    disconnect(collectionViewer: CollectionViewer): void { return this.categoriesSubject.complete(); }

    getCategorias(pageIndex: number, pageSize: number) { 
        this.categoriesService.getAllCategories(pageIndex, pageSize).subscribe((res) => { this.totalCountSubject.next(res.total); this.categoriesSubject.next(res.registers); })}

}