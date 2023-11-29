import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from 'src/app/services/title/title.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private title: TitleService
    ) { }
  ngOnInit(): void {
    this.title.setTitle('Bem vindo ao Sistema Complementa UFPR!');
  }

  imgAprendaUsar = "assets/plugins/images/dashboard/aprendaUsar.png";
  imgAtvsMonitor = "assets/plugins/images/dashboard/atvsMonitoradas.png";
  imgContestacao = "assets/plugins/images/dashboard/contestacoes.png";
  imgSeusProjetos = "assets/plugins/images/dashboard/seusProjetos.png";
  imgSuasAtvs = "assets/plugins/images/dashboard/suasAtvs.png";

  abrirListaDeProjetos() {
    this.toastr.success('Lista de projetos aberta com sucesso!', 'Sucesso!');
  }
  abrirListaDeAtividades() {
    this.toastr.success('Lista de atividades aberta com sucesso!', 'Sucesso!');
  }
  abrirListaDeAtividadesMonitoradas() {
    this.toastr.success('Lista de atividades monitoradas aberta com sucesso!', 'Sucesso!');
  }
  abrirListaDeContestacoes() {
    this.toastr.success('Lista de contestações aberta com sucesso!', 'Sucesso!');
  }
  abrirAprendaUsar() {
    this.toastr.info('Em breve!', 'Aviso!');
  }


}
