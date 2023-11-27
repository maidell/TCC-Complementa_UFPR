import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Coordenador, Graduacao, Orientador, Servidor, Usuario } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, filter, forkJoin } from 'rxjs';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LoginService } from '../../auth/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ServidorService } from '../../../services/servidor/services/servidor.service';
import { Router } from '@angular/router';
import { OrientadorService } from '../../../services/orientador/services/orientador.service';
import { ServidorCoordenador } from 'src/app/shared/models/servidor-coordenador.model';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss'],

})
export class ServidoresComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  usuarioLogado: Usuario = new Usuario;
  coordenador: Coordenador = new Coordenador;
  graduacao: Graduacao = new Graduacao;
  idGrad!: number;
  idCoord!: number;
  servidoresCoordenadores: ServidorCoordenador[] = [];

  servidores: Servidor[] = [];
  orientadores: Orientador[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Servidor>;
  constructor(
    // @Inject(DIALOG_DATA) public data: any,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private loginService: LoginService,
    private servidorService: ServidorService,
    private orientadorService: OrientadorService,
    private graduacaoService: GraduacaoService,
    public toastr: ToastrService
  ) {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`login`]);
    }
    // if(data){
    //   this.idGrad = data.idGrad;
    //   this.idCoord = data.idCoord;
    // }
    this.dataSource = new MatTableDataSource(this.servidores);
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.usuarioLogado = this.loginService.usuarioLogado;
    if (this.usuarioLogado.papel !== "ADMIN"
      && this.usuarioLogado.papel !== "COORDENADOR") {
      this.router.navigate([`${this.usuarioLogado.papel}`]);
    }
    forkJoin({

      graduacao: this.instanciarGraduacao(this.idGrad),
      coord: this.instanciarCoordenador(this.idCoord),
      servidores: this.listarServidores(),
      orientadores: this.listarOrientadores()

    }).subscribe(({ graduacao, coord, servidores, orientadores }) => {
      if (servidores && orientadores) {

        this.coordenador = coord;
        this.graduacao = graduacao;
        this.servidores = servidores;
        this.orientadores = orientadores;
        this.servidoresCoordenadores = graduacao.servidoresCoordenadores;

      }

      this.servidores = this.filtrarServidores(this.servidores, this.orientadores, this.graduacao);
      this.verificarServidoresCoordenadores(this.servidores);
      this.dataSource.data = this.servidores;
      this.changeDetectorRef.detectChanges();

    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  hasObject(): boolean {
    return this.servidores.length > 0;
  }

  applyFilter(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  instanciarCoordenador(id: number): Observable<Orientador> {
    return this.orientadorService.buscarOrientadorPorId(id);
  }

  listarServidores(): Observable<Servidor[]> {
    return this.servidorService.listarTodosServidores();
  }

  listarOrientadores(): Observable<Orientador[]> {
    return this.orientadorService.listarTodosOrientadores();
  }

  instanciarGraduacao(id: number): Observable<Graduacao> {
    return this.graduacaoService.buscarGraduacaoPorId(id);
  }

  adicionarServidor(servidor: Servidor): void {
    let servCoordenador = new ServidorCoordenador(servidor.id, servidor.nome, servidor.email,
      servidor.telefone, servidor.senha, servidor.papel, servidor.matricula);
    this.servidoresCoordenadores.push(servCoordenador);
    this.graduacao.servidoresCoordenadores = this.servidoresCoordenadores;
    this.graduacaoService.atualizarGraduacao(this.graduacao).subscribe(
      (response) => {
        this.graduacao = response;
        this.toastr.success("Servidor cadastrado!");
        this.servidoresCoordenadores = response.servidoresCoordenadores;
        this.verificarServidoresCoordenadores(this.servidores);
        this.dataSource.data = this.servidores;
      },
      (error) => {
        this.toastr.error("Erro ao cadastrar servidor");
        console.error("Erro ao cadastrar servidor:", error);
      }
    );
    this.dataSource.data = this.servidores;
    this.changeDetectorRef.detectChanges();
   }

   removerServidor(servidor: Servidor): void {
    this.servidoresCoordenadores = this.servidoresCoordenadores.filter(serv => serv.id !== servidor.id);
    this.graduacao.servidoresCoordenadores = this.servidoresCoordenadores;
    this.graduacaoService.atualizarGraduacao(this.graduacao).subscribe(
      (response) => {
        this.graduacao = response;
        this.toastr.info("Servidor removido!");
        this.servidoresCoordenadores = response.servidoresCoordenadores;
        this.verificarServidoresCoordenadores(this.servidores);
        this.dataSource.data = this.servidores;
        },
      (error) => {
        this.toastr.error("Erro ao cadastrar servidor");
        console.error("Erro ao cadastrar servidor:", error);
      }
    );
    this.dataSource.data = this.servidores;
    this.changeDetectorRef.detectChanges();
    }

  verificarServidoresCoordenadores(servidores: Servidor[]): void {
    const servidoresCoordenadoresIds = this.servidoresCoordenadores.map(servidor => servidor.id);
    servidores.forEach(servidor => {
      if (servidoresCoordenadoresIds.includes(servidor.id)) {
        servidor.incluido = true;
      } else {
        servidor.incluido = false;
      }
    });
    this.servidores = servidores;
  }

  filtrarServidores(servidores: Servidor[], orientadores: Orientador[], graduacao: Graduacao): Servidor[] {

    const servidoresFiltrados = servidores.filter(servidor => servidor.papel === 'SERVIDOR');
    const orientadoresFiltrados = orientadores.filter(orientador => orientador.graduacao === graduacao);

    return [...servidoresFiltrados, ...orientadoresFiltrados];
  }



}


