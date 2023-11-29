import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Projeto, Usuario } from 'src/app/shared';
import { Orientador } from 'src/app/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjetoService } from '../../projeto/services/projeto.service';
import { LoginService } from '../../auth/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  projetos: Projeto[] = []
  usuarioLogado: Usuario = new Usuario();
  orientador!: Orientador;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Projeto>;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private changeDetectorRef: ChangeDetectorRef,
    private projetoService: ProjetoService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private orientadorService: OrientadorService
  ) {

  }

  applyFilter(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    //usar serviço de verificaçãod de role pra apresentar o titulo de acordo com a role
    this.titleService.setTitle('Projetos');
    if(this.usuarioLogado.papel === 'ADMIN'){
      this.instanciarListaDeProjetos().subscribe(
        (res: Projeto[]) => {
          console.log("dados recebidos da api", res)
          this.projetos = res;
          this.dataSource = new MatTableDataSource<Projeto>(res);
          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();
          this.changeDetectorRef.detectChanges();
        },
        (err: any) => {
          this.toastr.error("Erro ao instanciar Projetos");
          console.log("Erro ao instanciar Projetos", err);
        }
      );
    }else{
      this.instanciarListaDeProjetosPorIntegrante(this.usuarioLogado.id).subscribe(
        (res: Projeto[]) => {
          console.log("dados recebidos da api", res)
          this.projetos = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRef.detectChanges();
          this.obs = this.dataSource.connect();
        },
        (err: any) => {
          this.toastr.error("Erro ao instanciar Projetos");
          console.log("Erro ao instanciar Projetos", err);
        }
      );
    }
  }
  buttonNew: string = "Novo projeto!";

  adicionarProjeto() {
  console.log('Chamando adicionarProjeto()');
  try {
    this.router.navigate(['/projetos/novo']);
  } catch (error) {
    console.error('Erro ao navegar para /projeto/novo:', error);
  }
}

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  hasProjects(): boolean {
    return this.projetos.length > 0;
  }

  buttonOne: string = "Detalhes!";
  tipoLabel: string = "Tipo";//Extenção, tcc,...
  cursoLabel: string = "Curso";
  orientadorLabel: string = "Orientador";
  TitleWarning: string = "Aviso";
  Description: string = "Para cadastrar um novo projeto converse com seu orientador!";
  Button: string = "Saiba mais";


  projeto: Projeto = new Projeto();

  abrirProjeto(projeto: Projeto) {
    if(projeto){
      this.router.navigate([`/projetos/detalhes/${projeto.id}`]);
    }
  }

  instanciarListaDeProjetosPorIntegrante(id: number): Observable<Projeto[]> {
    return this.projetoService.listarTodosProjetosPorIdUsuario(id);
  }

  instanciarListaDeProjetos(): Observable<Projeto[]> {
    return this.projetoService.listarTodosProjetos();
  }

  instanciarOrientador(usuario: Usuario){
    this.orientadorService.buscarOrientadorPorId(usuario.id).subscribe(
      (res: Orientador) => {
        this.orientador = res;
      },
      (error: any) => {
        console.log("Erro ao instanciar orientador", error);
        this.toastr.error("Erro ao instanciar orientador");
      }
    );
  }

}



