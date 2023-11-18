import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent implements OnInit{
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Competencias');
  }
  objections: String[] = ["aaaa", "bbbb", "cccc"];

  hasObjections(): boolean {
    return this.objections.length > 0;
  }

}
