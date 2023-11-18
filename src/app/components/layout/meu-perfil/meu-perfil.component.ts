import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss']
})
export class MeuPerfilComponent implements OnInit {
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Meu Perfil');
  }

}
