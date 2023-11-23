import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { Contestacao } from 'src/app/shared/models/contestacao.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contestacoes',
  templateUrl: './contestacoes.component.html',
  styleUrls: ['./contestacoes.component.scss']
})
export class ContestacoesComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(private titleService: TitleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Contestacao>(this.contestacoes);
  }
  columns: { title: string, suffix?: string, key: string }[] = [
    { title: "Contestacao", key: 'nome' },
    { title: "Status", key: 'status' }
  ];

  dataSource!: MatTableDataSource<Contestacao>;
  ngOnInit(): void {
    this.titleService.setTitle('Contestações');
    this.dataSource = new MatTableDataSource<Contestacao>(this.contestacoes);
  }


  contestacoes: Contestacao[] = [

  ]

  hasObject(): boolean {
    return this.contestacoes.length > 0;
  }
}
