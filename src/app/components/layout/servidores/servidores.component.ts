import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TitleService } from '../../title.service';
import { Coordenador, Graduacao, Servidor, Usuario } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, forkJoin } from 'rxjs';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LoginService } from '../../auth/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ServidorService } from '../../servidor/services/servidor.service';
import { Router } from '@angular/router';
import { CoordenadorService } from '../../coordenador/services/coordenador.service';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss'],

})
export class ServidoresComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  usuarioLogado: Usuario = new Usuario;
  coordenador: Coordenador = new Coordenador;

  servidores: Servidor[] = [
  // {
  //   id: 1,
  //   nome: "João",
  //   email: "joao@ufpr.br",
  //   telefone: "123456789",
  //   senha: "123456",
  //   papel: "Orientador",
  //   matricula: "123456",
  //   incluido : true
  // },
  // {
  //   id: 2,
  //   nome: "Maria",
  //   email: "maria@ufpr.br",
  //   telefone: "123456789",
  //   senha: "123456",
  //   papel: "Orientador",
  //   matricula: "123456",
  //   incluido : false
  // },
  // {
  //   id: 3,
  //   nome: "José",
  //   email: "jose@ufpr.br",
  //   telefone: "123456789",
  //   senha: "123456",
  //   papel: "Orientador",
  //   matricula: "123456",
  //   incluido : true
  // }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Servidor>;
  constructor(
    // @Inject(DIALOG_DATA) public data: Servidor,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private loginService: LoginService,
    private servidorService: ServidorService,
    private coordenadorService: CoordenadorService,
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
      coord: this.instanciarCoordenador(this.usuarioLogado.email),
      servidores: this.listarServidores()
    }).subscribe(({ coord, servidores }) => {
      if (coord) {
        this.coordenador = coord;
      }
      this.servidores = servidores;
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

  instanciarCoordenador(email: string): Observable<Coordenador> {
    return this.coordenadorService.buscarCoordenadorPorEmail(email);
  }

  listarServidores(): Observable<Servidor[]>{
    return this.servidorService.listarTodosServidores();
  }

}
