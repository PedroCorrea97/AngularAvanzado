import { Injectable } from '@angular/core';
import { Subject, scan, shareReplay } from 'rxjs';
import { Action } from '../models/action';
import { CarritoItem } from '../models/carrito';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private itemSubject = new Subject<Action<CarritoItem>>();
  itemAction$ = this.itemSubject.asObservable();

  itemsCarrito$ = this.itemAction$.pipe(
    scan((items,itemAction)=> this.modificarCarrito(items,itemAction),
    [] as CarritoItem[]),
    shareReplay(1)
  );

  agregarCarrito(curso:Curso){
    this.itemSubject.next({
      item:{curso,cantidad:1},
      action:'add'
    });
  }

  private modificarCarrito(items:CarritoItem[], operacion: Action<CarritoItem>):CarritoItem[]{
    if(operacion.action==='add'){

      const itemEnCarrito = items.find((item)=> item.curso.id === operacion.item.curso.id);
      if(itemEnCarrito){
        itemEnCarrito.cantidad++;
        return items.map((item)=>
          item.curso.id === itemEnCarrito.curso.id ? itemEnCarrito :item
        );
      }
      else{
        return [...items,operacion.item]
      }
    }

    return [...items];
  }
}
