import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Coordenador, Graduacao, Orientador, Servidor, Usuario } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, filter, forkJoin } from 'rxjs';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LoginService } from '../../auth/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ServidorService } from '../../servidor/services/servidor.service';
import { Router } from '@angular/router';
import { OrientadorService } from '../../orientador/services/orientador.service';
import { ServidorCoordenador } from 'src/app/shared/models/servidor-coordenador.model';

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
  idCoord: number = 48;
  idGrad: number = 12;

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
    public toastr: ToastrService
    ) {
      if (!this.loginService.usuarioLogado) {
        this.router.navigate([`login`]);
      }
    this.dataSource = new MatTableDataSource(this.servidores);
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.usuarioLogado = this.loginService.usuarioLogado;
    if (this.usuarioLogado.papel !== "ADMIN"
        && this.usuarioLogado.papel !== "COORDENADOR" ) {
      this.router.navigate([`${this.usuarioLogado.papel}`]);
    }
    forkJoin({

      graduacao: this.instanciarGraduacao(this.idGrad),
      coord: this.instanciarCoordenador(this.idCoord),
      servidores: this.listarServidores(),
      orientadores: this.listarOrientadores()
    }).subscribe(({ graduacao, coord, servidores, orientadores }) => {
      if(servidores && orientadores){
              this.coordenador = coord;
      this.graduacao = graduacao;
      this.servidores = servidores;
      this.orientadores = orientadores;
      this.servidoresCoordenadores = graduacao.servidoresCoordenadores;
      }

      this.servidores = this.filtrarServidores(this.servidores, this.orientadores, this.graduacao);
      this.servidores = this.verificarServidoresCoordenadores(this.servidores);
      this.dataSource.data = this.servidores; 
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

  listarServidores(): Observable<Servidor[]>{
    return this.servidorService.listarTodosServidores();
  }

  listarOrientadores(): Observable<Orientador[]>{
    return this.orientadorService.listarTodosOrientadores();
  }

  instanciarGraduacao(id: number): Observable<Graduacao>{
    return this.servidorService.buscarGraduacaoPorId(id);
  }

  verificarServidoresCoordenadores(servidores: Servidor[]): Servidor[] {
    const servidoresCoordenadoresIds = this.servidoresCoordenadores.map(servidor => servidor.id);
    servidores.forEach(servidor => {
      if (servidoresCoordenadoresIds.includes(servidor.id)) {
        servidor.incluido = true;
      }
    });
    return servidores;
  }

  filtrarServidores(servidores: Servidor[], orientadores: Orientador[], graduacao: Graduacao): Servidor[] {
    
    const servidoresFiltrados = servidores.filter(servidor => servidor.papel === 'SERVIDOR');
    const orientadoresFiltrados = orientadores.filter(orientador => orientador.graduacao === graduacao);
  
    return [...servidoresFiltrados, ...orientadoresFiltrados];
  }



}


