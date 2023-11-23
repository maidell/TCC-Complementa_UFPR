import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { Competencia, Coordenador, Graduacao } from 'src/app/shared';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrls: ['./graduacoes.component.scss']
})
export class GraduacoesComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(private titleService: TitleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Graduacao>(this.graduacoes);
  }
  columns: { title: string, key: string }[] = [
    { title: "Graduações", key: 'nome' }
  ];

  dataSource!: MatTableDataSource<Graduacao>;
  ngOnInit(): void {
    this.titleService.setTitle('Graduacaos');
    this.dataSource = new MatTableDataSource<Graduacao>(this.graduacoes);
  }

  // public id!: number;
  // public nome: string = "";
  // public coordenador!: Coordenador;
  // public competencias!: Competencia[];
  graduacoes: Graduacao[] = []

  hasObjects(): boolean {
    return this.graduacoes.length > 0;
  }

}
