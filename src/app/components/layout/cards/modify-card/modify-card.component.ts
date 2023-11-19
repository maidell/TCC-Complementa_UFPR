import { Component } from '@angular/core';
import { ServidoresComponent } from '../../servidores/servidores.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-card',
  templateUrl: './modify-card.component.html',
  styleUrls: ['./modify-card.component.scss']
})
export class ModifyCardComponent {
  constructor(public dialog: MatDialog) { }
title: string = 'Modificar';

  openDialog() {
    this.dialog.open(ServidoresComponent, {
      width: '100%',
      height: '30rem'
    });
  }

}
