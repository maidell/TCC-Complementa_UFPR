import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AtividadeService } from '../../atividade/services/atividade.service';
import { Atividade, Usuario } from 'src/app/shared';

@Component({
  selector: 'app-contestacoes',
  templateUrl: './contestacoes.component.html',
  styleUrls: ['./contestacoes.component.scss']
})
export class ContestacoesComponent implements OnInit {
  button: string = "Detalhes!";
  usuarioLogado!: Usuario;
  constructor(
          private titleService: TitleService,
          public dialog: MatDialog,
          public loginService: LoginService,
          public router: Router,
          private atividadeService: AtividadeService
          ) {
    this.dataSource = new MatTableDataSource<Atividade>(this.atividades);
  }
  columns: { title: string, suffix?: string, key: string }[] = [
    { title: "Contestacao", key: 'nome' },
    { title: "Status", key: 'status' }
  ];

  dataSource!: MatTableDataSource<Atividade>;
  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado
    if (!this.usuarioLogado) {
      this.router.navigate([`login`]);
    }
    this.titleService.setTitle('Contestações');
    this.instanciarContestacoes(this.usuarioLogado.id)
    this.dataSource = new MatTableDataSource<Atividade>(this.atividades);
  }

  atividades: Atividade[] = [];

  instanciarContestacoes(id: number): Observable<Atividade[]>{
    return this.atividadeService.listarTodasAtividadesContestadasPorIdServCoord(id);
  }

  hasObject(): boolean {
    return this.atividades.length > 0;
  }
}
