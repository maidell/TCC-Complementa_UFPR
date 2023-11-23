import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { MatDialog } from '@angular/material/dialog';
import { Competencia, Complexidade, Graduacao, Orientador, Usuario } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';
import { GraduacaoService } from '../../../services/graduacao/services/graduacao.service';
import { CompetenciaService } from '../../../services/competencia/services/competencia.service';
import { OrientadorService } from '../../../services/orientador/services/orientador.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent implements OnInit {
  button: string = "Detalhes!";
  usuarioLogado: Usuario = new Usuario();
  coordenador: Orientador = new Orientador();
  graduacao: Graduacao = new Graduacao();
  competencias: Competencia[] = [];

  constructor(
    private titleService: TitleService,
    public router: Router,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public loginService: LoginService,
    public competenciaService: CompetenciaService,
    public graduacaoService: GraduacaoService,
    public orientadorService: OrientadorService
  ) {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    // if (this.usuarioLogado.papel !== 'COORDENADOR') {
    //   this.router.navigate([`${this.usuarioLogado.papel}`]);
    // } //descomentar quando finalizar
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }
  columns: { title: string, key: string }[] = [
    { title: "Competência", key: 'nome' }
  ];

  dataSource!: MatTableDataSource<Competencia>;

  ngOnInit(): void {
    this.titleService.setTitle('Competencias');
    this.instanciarValores();
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }

  hasObjects(): boolean {
    return this.competencias.length > 0;
  }

  instanciarValores(): void {
    this.orientadorService.buscarOrientadorPorId(this.usuarioLogado.id).subscribe(
      (res: Orientador) => {
        this.coordenador = res;
        this.graduacao = this.coordenador.graduacao;
        this.competencias = this.graduacao.competencias;
        this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
      },
      (error: any) => {
        this.toastr.error("Coordenador não encontrado!")
        console.log(error);
      }
    );
  }


}
