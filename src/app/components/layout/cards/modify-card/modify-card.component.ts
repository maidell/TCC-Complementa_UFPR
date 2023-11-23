import { Component, OnInit } from '@angular/core';
import { ServidoresComponent } from '../../servidores/servidores.component';
import { MatDialog } from '@angular/material/dialog';
import { Competencia, Complexidade, Graduacao } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-modify-card',
  templateUrl: './modify-card.component.html',
  styleUrls: ['./modify-card.component.scss']
})
export class ModifyCardComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }
  title: string = 'Modificar';

  openDialog() {
    this.dialog.open(ServidoresComponent, {
      minWidth: '50%',
    });
  }
  columns: { title: string, key: string }[] = [
    { title: "Competência", key: 'nome' },
    { title: "ID", key: 'id' }
  ];

  dataSource!: MatTableDataSource<Competencia>;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }

  competencias: Competencia[] = [
    // { nome: 'Front-end', id: 2304, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Back-end', id: 2305, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Full-stack', id: 2306, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Mobile', id: 2307, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'DevOps', id: 2308, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'UX/UI', id: 2309, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Data Science', id: 2310, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Business Intelligence', id: 2311, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Business Analytics', id: 2312, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    // { nome: 'Outros', id: 2313, graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
  ]

}


