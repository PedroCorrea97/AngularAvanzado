import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.scss']
})
export class MensajeConfirmacionComponent  implements OnInit {
  message!: string;
  textAcept = 'Si';
  constructor( public dialogRef : MatDialogRef <MensajeConfirmacionComponent>, @Inject (MAT_DIALOG_DATA) public data: {message:string;} ){}

  ngOnInit(){ this.message = this.data.message }

  close(){ this.dialogRef.close(); }
}
