import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Cursos } from "src/app/models/cursos";
import { CursosService } from "src/app/services/cursos/cursos.service";


export class CursosDataSurce{
    private coursesSubject = new BehaviorSubject<Cursos[]>([]);
    public courses$ = this.coursesSubject.asObservable();
    constructor( private coursesService: CursosService ){ }

    connect(collectionViewer: CollectionViewer){ return this.courses$; }
    disconnect(collectionViewer: CollectionViewer): void { return this.coursesSubject.complete(); }

    loadCourses() {
        this.coursesService.getAllCourses().subscribe((cursos) => {
            this.coursesSubject.next(cursos);
        });
    }
}