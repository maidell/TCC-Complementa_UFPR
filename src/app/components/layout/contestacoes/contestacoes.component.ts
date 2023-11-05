import { Component } from '@angular/core';

@Component({
  selector: 'app-contestacoes',
  templateUrl: './contestacoes.component.html',
  styleUrls: ['./contestacoes.component.scss']
})
export class ContestacoesComponent {
  objections : String [] = ["aaaa","bbbb","cccc"];

  hasObjections(): boolean {
    return this.objections.length > 0;
  }
}
