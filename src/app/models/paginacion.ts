export class Paginacion <T>{
    constructor( init?: Partial <T> ){ Object.assign(this, init) }

    pageIndex: number = 1;
    pageZise: number = 3;
    total: number = 0;
    totalPages: number = 0;
    hasPreviousPAge: boolean = false;
    hasNextPage: boolean = false;
    registers: T [] = [];
}