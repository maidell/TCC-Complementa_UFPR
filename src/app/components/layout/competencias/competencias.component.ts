import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { MatDialog } from '@angular/material/dialog';
import { Competencia, Complexidade, Graduacao } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(private titleService: TitleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }
  columns: { title: string, key: string }[] = [
    { title: "Competência", key: 'nome' }
  ];

  dataSource!: MatTableDataSource<Competencia>;
  ngOnInit(): void {
    this.titleService.setTitle('Competencias');
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }
  competencias: Competencia[] = [
    { nome: 'Front-end', id: 2304, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Back-end', id: 2305, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Full-stack', id: 2306, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Mobile', id: 2307, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'DevOps', id: 2308, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'UX/UI', id: 2309, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Data Science', id: 2310, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Business Intelligence', id: 2311, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Business Analytics', id: 2312, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    { nome: 'Outros', id: 2313, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
  ]

  hasObjects(): boolean {
    return this.competencias.length > 0;
  }

}
