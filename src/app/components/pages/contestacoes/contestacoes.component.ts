import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Contestacao } from 'src/app/shared/models/contestacao.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contestacoes',
  templateUrl: './contestacoes.component.html',
  styleUrls: ['./contestacoes.component.scss']
})
export class ContestacoesComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(
          private titleService: TitleService,
          public dialog: MatDialog,
          public loginService: LoginService,
          public router: Router
          ) {
    this.dataSource = new MatTableDataSource<Contestacao>(this.contestacoes);
  }
  columns: { title: string, suffix?: string, key: string }[] = [
    { title: "Contestacao", key: 'nome' },
    { title: "Status", key: 'status' }
  ];

  dataSource!: MatTableDataSource<Contestacao>;
  ngOnInit(): void {

    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`login`]);
    }
    this.titleService.setTitle('Contestações');
    this.dataSource = new MatTableDataSource<Contestacao>(this.contestacoes);
  }


  contestacoes: Contestacao[] = [

  ]

  hasObject(): boolean {
    return this.contestacoes.length > 0;
  }
}
