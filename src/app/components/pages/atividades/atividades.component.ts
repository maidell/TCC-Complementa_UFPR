import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Aluno, Atividade, Orientador, Projeto, Usuario } from 'src/app/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AtividadeService } from '../../atividade/services/atividade.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../auth/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AtividadeComponent } from '../../atividade/atividade/atividade.component';
import { AlunoService } from 'src/app/services/aluno/services/aluno.service';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit, OnDestroy {

  inputValue: string = '';
  inputValueDisp: string = '';
  inputValueEmEx: string = '';
  inputValueEx: string = '';
  inputValueOri: string = '';
  atividades: Atividade[] = [];
  usuarioLogado: Usuario = new Usuario();
  aluno?: Aluno;
  orientador?: Orientador;
  atividadesDisponiveis: Atividade[] = [];
  atividadesExecutante: Atividade[] = [];
  atividadesEmExecucao: Atividade[] = [];
  atividadesExecutadas: Atividade[] = [];
  atividadesOrientadas: Atividade[] = [];
  atividade?: Atividade;
  projeto?: Projeto;

  datePipe!: DatePipe;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<Atividade[]>;
  obsDisp!: Observable<Atividade[]>;
  obsEmEx!: Observable<Atividade[]>;
  obsEx!: Observable<Atividade[]>;
  obsOri!: Observable<Atividade[]>;
  dataSource!: MatTableDataSource<Atividade>;
  dataSourceAtvDisp!: MatTableDataSource<Atividade>;
  dataSourceAtvEmEx!: MatTableDataSource<Atividade>;
  dataSourceAtvEx!: MatTableDataSource<Atividade>;
  dataSourceAtvOri!: MatTableDataSource<Atividade>;

  constructor(
    private titleService: TitleService,
    private changeDetectorRef: ChangeDetectorRef,
    public atividadeService: AtividadeService,
    public router: Router,
    public toastr: ToastrService,
    public loginService: LoginService,
    public alunoService: AlunoService,
    public orientadorService: OrientadorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado
    if (!this.usuarioLogado) {
      this.router.navigate(['login']);
    } else {
      this.instanciarAtividadesPorPapel(this.usuarioLogado);
    }
    this.titleService.setTitle("Atividades");
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
      this.dataSourceAtvDisp.disconnect();
      this.dataSourceAtvEmEx.disconnect();
      this.dataSourceAtvEx.disconnect();
      this.dataSourceAtvOri.disconnect();
    }
  }



  applyFilter(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterDisp(event: Event) {
    this.inputValueDisp = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValueDisp.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSourceAtvDisp.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAtvDisp.paginator) {
      this.dataSourceAtvDisp.paginator.firstPage();
    }
  }

  applyFilterEmEx(event: Event) {
    this.inputValueEmEx = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValueEmEx.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSourceAtvEmEx.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAtvEmEx.paginator) {
      this.dataSourceAtvEmEx.paginator.firstPage();
    }
  }

  applyFilterEx(event: Event) {
    this.inputValueEx = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValueEx.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSourceAtvEx.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAtvEx.paginator) {
      this.dataSourceAtvEx.paginator.firstPage();
    }
  }

  applyFilterOri(event: Event) {
    this.inputValueOri = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValueOri.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSourceAtvOri.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAtvOri.paginator) {
      this.dataSourceAtvOri.paginator.firstPage();
    }
  }

  hasActivities(): boolean {
    return this.atividades.length > 0
      || this.atividadesDisponiveis.length > 0
      || this.atividadesEmExecucao.length > 0
      || this.atividadesExecutadas.length > 0
      || this.atividadesOrientadas.length > 0
      ;
  }

  buttonOne: string = "Detalhes!";
  dataCriacaoLabel: string = "Data de Criação";
  dataLimiteCandidaturaLabel: string = "Data de Limite para Candidatura";
  dataConclusaoLabel: string = "Data de Conclusão";
  dataContestacaoLabel: string = "Data de Contestação";

  TitleWarning: string = "Aviso";
  Description: string = "";
  Button: string = "Saiba mais";

  instanciarAtividadesPorPapel(usuario: Usuario) {
    switch (usuario.papel) {
      case 'ALUNO': {
        this.instanciarAluno(usuario.id).subscribe(
          (res: Aluno) => {
            this.aluno = res;
            forkJoin({
              atividadesDisponiveis: this.instanciarAtividadesPorGraduacao(res.graduacao.id),
              atividadesExecutante: this.instanciarAtividadesPorExecutor(res.id)
            }).subscribe(({ atividadesDisponiveis, atividadesExecutante }) => {
              if (atividadesDisponiveis) {
                this.atividadesDisponiveis = atividadesDisponiveis;
                this.dataSourceAtvDisp = new MatTableDataSource(this.atividadesDisponiveis);
                this.changeDetectorRef.detectChanges();
                this.dataSourceAtvDisp.paginator = this.paginator;
                this.obsDisp = this.dataSourceAtvDisp.connect();

                console.log('Atividades Disponíveis:', atividadesDisponiveis);
              }
              if (atividadesExecutante) {
                this.atividadesExecutante = atividadesExecutante;

                console.log('Atividades Executante:', atividadesExecutante);
              }
              this.separarPorStatus();
              this.changeDetectorRef.detectChanges();

            }
            )
          },
          (error: any) => {
            console.log("Erro ao instanciar aluno", error);
            this.toastr.error("Erro ao instanciar aluno");
          });
        break;
      };
      case 'ORIENTADOR': {
        this.instanciarOrientador(usuario.id).subscribe(
          (res: Orientador) => {
            this.orientador = res;
            this.instanciarAtividadesPorOrientador(res.id).subscribe(
              (res: Atividade[]) => {
                this.atividadesOrientadas = res;
                this.dataSourceAtvOri = new MatTableDataSource(this.atividadesOrientadas);
                this.changeDetectorRef.detectChanges();
                this.dataSourceAtvOri.paginator = this.paginator;
                this.obsOri = this.dataSourceAtvOri.connect();

              }
            )
          },
          (error: any) => {
            console.log("Erro ao instanciar coordenador", error);
            this.toastr.error("Erro ao instanciar coordenador");
          });
        break;
      }
      case 'COORDENADOR': {
        this.instanciarOrientador(usuario.id).subscribe(
          (res: Orientador) => {
            this.orientador = res;
            forkJoin({
              atividadesDisponiveis: this.instanciarAtividadesPorGraduacao(res.graduacao.id),
              atividadesOrientadas: this.instanciarAtividadesPorOrientador(res.id)
            }).subscribe(({ atividadesDisponiveis, atividadesOrientadas }) => {
              if (atividadesDisponiveis) {
                this.atividadesDisponiveis = atividadesDisponiveis;
                this.dataSourceAtvDisp = new MatTableDataSource(this.atividadesDisponiveis);
                this.dataSourceAtvDisp.paginator = this.paginator;
                this.changeDetectorRef.detectChanges();
                this.obsDisp = this.dataSourceAtvDisp.connect();

              }
              if (atividadesOrientadas) {
                this.atividadesOrientadas = atividadesOrientadas;
                this.dataSourceAtvOri = new MatTableDataSource(this.atividadesOrientadas);
                this.dataSourceAtvOri.paginator = this.paginator;
                this.changeDetectorRef.detectChanges();
                this.obsOri = this.dataSourceAtvOri.connect();

              }
            }
            )
          },
          (error: any) => {
            console.log("Erro ao instanciar coordenador", error);
            this.toastr.error("Erro ao instanciar coordenador");
          });
        break;
      }
      case 'ADMIN':
      case 'SERVIDOR': {
        this.instanciarAtividades().subscribe(
          (res: Atividade[]) => {
            this.atividades = res;
            this.dataSource = new MatTableDataSource(this.atividades);
            this.changeDetectorRef.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.obs = this.dataSource.connect();
          },
          (error) => {
            console.log("Erro ao listar atividades", error);
            this.toastr.error("Erro ao listar atividades");
          }
        )

      }
    }
  }

  separarPorStatus() {
    for (const atividade of this.atividadesExecutante) {
      if (atividade.status === 'FINALIZADA') {
        this.atividadesExecutadas.push(atividade);
      } else {
        this.atividadesEmExecucao.push(atividade);
      }
    }
    this.dataSourceAtvEx = new MatTableDataSource(this.atividadesExecutadas);

    this.dataSourceAtvEmEx = new MatTableDataSource(this.atividadesEmExecucao);

  }

  instanciarAtividades(): Observable<Atividade[]> {
    return this.atividadeService.listarTodasAtividades();
  }

  instanciarAtividadesPorAutor(id: number): Observable<Atividade[]> {
    return this.atividadeService.listarTodasAtividadesDeAutor(id);
  }

  instanciarAtividadesPorExecutor(id: number): Observable<Atividade[]> {
    return this.atividadeService.listarTodasAtividadesDeAlunoExecutor(id);
  }

  instanciarAtividadesPorGraduacao(id: number): Observable<Atividade[]> {
    return this.atividadeService.listarTodasAtividadesPorGraduacao(id);
  }

  instanciarAtividadesPorOrientador(id: number): Observable<Atividade[]> {
    return this.atividadeService.listarTodasAtividadesPorOrientador(id);
  }

  instanciarAluno(id: number): Observable<Aluno> {
    return this.alunoService.buscarAlunoPorId(id);
  }

  instanciarOrientador(id: number): Observable<Orientador> {
    return this.orientadorService.buscarOrientadorPorId(id);
  }

  instanciarAtividade(id: number): Observable<Atividade> {
    return this.atividadeService.buscarAtividadePorId(id);
  };



  openDialog(atividade: Atividade) {
    if (atividade.id) {
      this.instanciarAtividade(atividade.id).subscribe(
        (res: Atividade) => {
          const dialogRef = this.dialog.open(AtividadeComponent, {
            maxWidth: this.dialogWidth(),
            data: { atividade: res, projeto: res.projeto }
          });
        },
        (error: any) => {
          console.log('Erro ao carregar dados', error);
        }
      );
    }

    // else {
    //   const dialogRef = this.dialog.open(AtividadeComponent, {
    //     maxWidth: this.dialogWidth(),
    //     data: { atividade: new Atividade() }
    //   });
    // }

  }

  dialogWidth() {
    if (window.innerWidth <= 768) {
      return "100vw";
    } else {
      return "80vw";
    }
  }

}
