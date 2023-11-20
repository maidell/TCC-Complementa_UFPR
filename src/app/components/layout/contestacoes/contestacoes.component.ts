import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-contestacoes',
  templateUrl: './contestacoes.component.html',
  styleUrls: ['./contestacoes.component.scss']
})
export class ContestacoesComponent implements OnInit {
  constructor(private titleService: TitleService) { }
  ngOnInit(): void {
    this.titleService.setTitle('Contestações');
  }
  objections : String [] = ["aaaa","bbbb","cccc"];

  hasObject(): boolean {
    return this.objections.length > 0;
  }
}
