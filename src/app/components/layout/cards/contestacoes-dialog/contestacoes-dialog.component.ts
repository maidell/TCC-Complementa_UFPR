import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atividade } from 'src/app/shared';

@Component({
  selector: 'app-contestacoes-dialog',
  templateUrl: './contestacoes-dialog.component.html',
  styleUrls: ['./contestacoes-dialog.component.scss']
})
export class ContestacoesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { atividade: Atividade }) {}
}
