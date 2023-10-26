export interface Curso {
    id:number;
    nombre:string;
    categoriaId?:number;
    precio:number;
    precioMasIva?:number;
    categoria?:string;
}
