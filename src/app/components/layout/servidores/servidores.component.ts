import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit {
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Servidores');
  }
  objections: String[] = ["aaaa", "bbbb", "cccc"];

  hasObject(): boolean {
    return this.objections.length > 0;
  }
}
