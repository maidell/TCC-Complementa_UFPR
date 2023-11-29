import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from 'src/app/services/title/title.service';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: string = '';
  constructor(
    private toastr: ToastrService,
    private title: TitleService,
    private loginService: LoginService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.title.setTitle('Bem vindo ao Sistema Complementa UFPR!');
    if (this.loginService.usuarioLogado) {
      this.userRole = this.loginService.usuarioLogado.papel;

    } else {
      this.loginService.usuarioLogado$.subscribe(usuario => {
        if (usuario) {
          this.userRole = this.loginService.usuarioLogado.papel;


        }
      });
    }

  }

  imgAprendaUsar = "assets/plugins/images/dashboard/aprendaUsar.png";
  imgAtvsMonitor = "assets/plugins/images/dashboard/atvsMonitoradas.png";
  imgContestacao = "assets/plugins/images/dashboard/contestacoes.png";
  imgSeusProjetos = "assets/plugins/images/dashboard/seusProjetos.png";
  imgSuasAtvs = "assets/plugins/images/dashboard/suasAtvs.png";

  abrirListaDeProjetos() {
    switch (this.userRole) {
      case 'ALUNO':
        this.router.navigate(['projetos/listar']);
        break;
      case 'SERVIDOR':
        this.router.navigate(['projetos/listar']);
        break;
      case 'MONITOR':
        this.router.navigate(['projetos/listar']);
        break;
      case 'ORIENTADOR':
        this.router.navigate(['projetos/listar']);
        break;
      case 'COORDENADOR':
        this.router.navigate(['projetos/listar']);
        break;
      case 'SERVIDOR_COORDENADOR':
        this.router.navigate(['projetos/listar']);
        break;
      case 'ADMIN':
        this.router.navigate(['projetos/listar']);
        break;
      default:
        this.router.navigate(['projetos/listar']);
        break;
    }
    this.toastr.success('Lista de projetos aberta com sucesso!', 'Sucesso!');
  }
  abrirListaDeAtividades() {
    switch (this.userRole) {
      case 'ALUNO':
        this.router.navigate(['atividades/listar']);
        break;
      case 'SERVIDOR':
        this.router.navigate(['atividades/listar']);
        break;
      case 'MONITOR':
        this.router.navigate(['atividades/listar']);
        break;
      case 'ORIENTADOR':
        this.router.navigate(['atividades/listar']);
        break;
      case 'COORDENADOR':
        this.router.navigate(['atividades/listar']);
        break;
      case 'SERVIDOR_COORDENADOR':
        this.router.navigate(['atividades/listar']);
        break;
      case 'ADMIN':
        this.router.navigate(['atividades/listar']);
        break;
      default:
        this.router.navigate(['atividades/listar']);
        break;
    }
    this.toastr.success('Lista de atividades aberta com sucesso!', 'Sucesso!');
  }

  abrirListaDeContestacoes() {
    switch (this.userRole) {
      case 'ALUNO':
        this.router.navigate(['contestacoes/listar']);
        break;
      case 'SERVIDOR':
        this.router.navigate(['contestacoes/listar']);
        break;
      case 'MONITOR':
        this.router.navigate(['contestacoes/listar']);
        break;
      case 'ORIENTADOR':
        this.router.navigate(['contestacoes/listar']);
        break;
      case 'COORDENADOR':
        this.router.navigate(['contestacoes/listar']);
        break;
      case 'SERVIDOR_COORDENADOR':
        this.router.navigate(['contestacoes/listar']);
        break;
      case 'ADMIN':
        this.router.navigate(['contestacoes/listar']);
        break;
      default:
        this.router.navigate(['contestacoes/listar']);
        break;
    }
    this.toastr.success('Lista de contestações aberta com sucesso!', 'Sucesso!');
  }
  abrirAprendaUsar() {
    this.toastr.info('Em breve!', 'Aviso!');
  }
  checkRole(role: string): boolean {
    return this.userRole === role;
  }


}
