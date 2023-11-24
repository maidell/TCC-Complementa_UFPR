import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Complexidade, Graduacao, Orientador, Usuario } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ComplexidadeService } from 'src/app/services/complexidade/services/complexidade.service';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complexidades',
  templateUrl: './complexidades.component.html',
  styleUrls: ['./complexidades.component.scss']
})
export class ComplexidadesComponent implements OnInit{
  button: string = "Detalhes!";
  usuarioLogado: Usuario = new Usuario();
  coordenador: Orientador = new Orientador();
  graduacao: Graduacao = new Graduacao();
  complexidades: Complexidade[] = [];

  constructor(private titleService: TitleService,
    public router: Router,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public loginService: LoginService,
    public complexidadeService: ComplexidadeService,
    public graduacaoService: GraduacaoService,
    public orientadorService: OrientadorService
    ) {
      if (!this.loginService.usuarioLogado) {
        this.router.navigate([`login`]);
      }
      this.usuarioLogado = this.loginService.usuarioLogado;
      if (this.usuarioLogado.papel !== 'COORDENADOR') {
        this.router.navigate([`${this.usuarioLogado.papel}`]);
      }
    this.dataSource = new MatTableDataSource<Complexidade>(this.complexidades);
  }
  columns: { title: string, suffix?: string, key: string }[] = [
    { title: "Complexidade", key: 'nome' },
    // { title: "ID da complexidade", key: 'id' },
    { title: "Carga horária mínima", key: 'cargaHorariaMinima', suffix: 'horas'},
    { title: "Carga horária máxima", key: 'cargaHorariaMaxima', suffix: 'horas' },
  ];

  dataSource!: MatTableDataSource<Complexidade>;

  ngOnInit(): void {
    this.titleService.setTitle('Complexidades');
    this.instanciarValores();
    this.dataSource = new MatTableDataSource<Complexidade>(this.complexidades);
  }

  hasObject(): boolean {
    return this.complexidades.length > 0;
  }

  instanciarValores(): void {
    this.orientadorService.buscarOrientadorPorId(this.usuarioLogado.id).subscribe(
      (res: Orientador) => {
        this.coordenador = res;
        this.graduacao = this.coordenador.graduacao;
        this.complexidades = this.graduacao.complexidades;
        this.dataSource = new MatTableDataSource<Complexidade>(this.complexidades);
      },
      (error: any) => {
        this.toastr.error("Coordenador não encontrado!")
        console.log(error);
      }
    );
  }
}
