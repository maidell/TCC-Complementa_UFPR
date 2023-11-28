import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Graduacao, Orientador, Usuario } from 'src/app/shared';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';

@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrls: ['./graduacoes.component.scss']
})
export class GraduacoesComponent implements OnInit {
  button: string = "Detalhes!";
  usuarioLogado: Usuario = new Usuario();
  graduacao: Graduacao = new Graduacao();
  coordenador: Orientador = new Orientador()
  graduacoes: Graduacao[] = [];

  constructor(
    private titleService: TitleService,
    public dialog: MatDialog,
    public loginService: LoginService,
    public graduacaoService: GraduacaoService,
    public orientadorService: OrientadorService,
    private router: Router,
    public toastr: ToastrService
    ) {
    this.dataSource = new MatTableDataSource<Graduacao>(this.graduacoes);
  }
  columns: { title: string, key: string }[] = [
    { title: "Graduações", key: 'nome' }
  ];

  dataSource!: MatTableDataSource<Graduacao>;
  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;
    if(!this.usuarioLogado){
      this.router.navigate(['/login']);
    }
    if (this.usuarioLogado.papel !== 'ADMIN' && this.usuarioLogado.papel !== 'COORDENADOR') {
      this.router.navigate([`${this.usuarioLogado.papel}`]);
    }
    if(this.usuarioLogado.papel === 'ADMIN'){
      this.listarGraduacoes();
    }else{
      this.instanciarCoordenador();
    }
    this.titleService.setTitle('Graduacões');
    }

  hasObjects(): boolean {
    return this.graduacoes.length > 0;
  }

  listarGraduacoes(): void {
    this.graduacaoService.listarTodasGraduacoes().subscribe(
      (res: Graduacao[]) => {
        this.graduacoes = res;
        this.dataSource = new MatTableDataSource<Graduacao>(this.graduacoes);
      },
      (error) => {
        this.toastr.error("Erro ao listar graduações");
        console.error("Erro ao listar graduações:", error);
      }
    )
  }

  instanciarCoordenador(): void {
    this.orientadorService.buscarOrientadorPorId(this.usuarioLogado.id).subscribe(
      (res: Orientador) => {
        this.coordenador = res;
        this.graduacao = this.coordenador.graduacao;
        this.graduacoes.push(this.graduacao);
        console.log(this.coordenador)
      },
      (error) => {
        this.toastr.error("Erro ao instanciar graduação");
        console.error("Erro ao instanciar graduação:", error);
      }
    )
  }

  salvarGraduacao(graduacao: Graduacao){
    this.graduacaoService.inserirGraduacao(graduacao).subscribe(
      (res: Graduacao) => {
        this.graduacao = res;
        this.toastr.success("Graduação " + res.nome +  " salva com sucesso!");
      },
      (error) => {
        this.toastr.error("Erro ao salvar graduação");
        console.error("Erro ao salvar graduação:", error);
      }
    )
  }


}
