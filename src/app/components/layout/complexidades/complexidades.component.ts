import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-complexidades',
  templateUrl: './complexidades.component.html',
  styleUrls: ['./complexidades.component.scss']
})
export class ComplexidadesComponent implements OnInit{
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Complexidades');
  }

  objections: String[] = ["aaaa", "bbbb", "cccc"];

  hasObject(): boolean {
    return this.objections.length > 0;
  }
}
