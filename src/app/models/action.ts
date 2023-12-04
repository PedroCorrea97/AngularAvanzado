import { ActionType } from "./actiontype";


export interface Action<T>{
    item:T,                 //payload
    action:ActionType
}