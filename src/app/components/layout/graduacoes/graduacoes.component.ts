import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrls: ['./graduacoes.component.scss']
})
export class GraduacoesComponent implements OnInit {
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Graduações');
  }
  objections: String[] = ["aaaa", "bbbb", "cccc"];

  hasObject(): boolean {
    return this.objections.length > 0;
  }
}
