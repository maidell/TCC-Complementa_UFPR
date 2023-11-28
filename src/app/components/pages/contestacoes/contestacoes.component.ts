import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
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
    this.dataSource = new MatTableDataSource<Atividade>(this.atividadesContestadas);
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
    forkJoin({
      contestacoes: this.instanciarContestacoes(this.usuarioLogado.id),
      contestacoesCH : this.instanciarContestacoesCargaHoraria(this.usuarioLogado.id)
    }).subscribe(({ contestacoes, contestacoesCH }) => {
      if (contestacoes && contestacoesCH) {
        if(contestacoes){
          this.atividadesContestadas = contestacoes;
        }
        if(contestacoesCH){
          this.atividadesCargaHorariaContestadas = contestacoesCH;
        } 
      }
      this.dataSource = new MatTableDataSource<Atividade>(this.atividadesContestadas);
    });
    
  }

  atividadesContestadas: Atividade[] = [];
  atividadesCargaHorariaContestadas: Atividade[] = [];

  instanciarContestacoes(id: number): Observable<Atividade[]>{
    return this.atividadeService.listarTodasAtividadesContestadasPorIdServCoord(id);
  }

  instanciarContestacoesCargaHoraria(id: number): Observable<Atividade[]>{
    return this.atividadeService.listarTodasAtividadesCargaHorariaContestadasPorIdServCoord(id);
  }

  hasObject(): boolean {
    return this.atividadesContestadas.length > 0;
  }
}
