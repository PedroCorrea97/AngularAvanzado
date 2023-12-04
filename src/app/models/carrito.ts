import { Curso } from "./curso.model";

export interface Carrito{
    carritoItems:CarritoItem[];
}

export interface CarritoItem{
    curso:Curso;
    cantidad:number;
}