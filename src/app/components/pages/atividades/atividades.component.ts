import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Aluno, Atividade, Orientador, Usuario } from 'src/app/shared';
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


@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit, OnDestroy {

  inputValue: string = '';
  atividades: Atividade[] = [];
  usuarioLogado?: Usuario;
  aluno?: Aluno;
  orientador?: Orientador;
  atividadesDisponiveis: Atividade[] = [];
  atividadesExecutante: Atividade[] = [];
  atividadesEmExecucao: Atividade[] = [];
  atividadesExecutadas: Atividade[] = [];
  atividadesOrientadas: Atividade[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Atividade>;
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

  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
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

  hasActivities(): boolean {
    return this.atividades.length > 0;
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
              }
              if (atividadesExecutante) {
                this.atividadesExecutante = atividadesExecutante;
              }
              this.separarPorStatus();
            }
            )
            },
          (error: any) => {
            console.log("Erro ao instanciar aluno", error);
            this.toastr.error("Erro ao instanciar aluno");
          });
        break;
      };
      case 'ORIENTADOR':{
        this.instanciarOrientador(usuario.id).subscribe(
          (res: Orientador) => {
            this.orientador = res;
            this.instanciarAtividadesPorOrientador(res.id).subscribe(
                (res: Atividade[]) => {
                  this.atividadesOrientadas = res;
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
              atividadesOrientadas: this.instanciarAtividadesPorExecutor(res.id)
            }).subscribe(({ atividadesDisponiveis, atividadesOrientadas }) => {
              if (atividadesDisponiveis) {
                this.atividadesDisponiveis = atividadesDisponiveis;
              }
              if (atividadesOrientadas) {
                this.atividadesOrientadas = atividadesOrientadas;
              }
            }
            )
            },
          (error: any) => {
            console.log("Erro ao instanciar coordenador", error);
            this.toastr.error("Erro ao instanciar coordenador");
          });
        break;
      };
      default: {
        this.instanciarAtividades().subscribe(
          (res: Atividade[]) => {
          },
          (error) => {
            console.log("Erro ao listar atividades", error);
            this.toastr.error("Erro ao listar atividades");
          }
        )

      }
    }
  }

  separarPorStatus(){
    for (const atividade of this.atividadesExecutante) {
      if (atividade.status === 'FINALIZADA') {
        this.atividadesExecutadas.push(atividade);
      } else {
        this.atividadesEmExecucao.push(atividade);
      }
    }
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

  openDialog(atividade: Atividade) {
    const dialogRef = this.dialog.open(AtividadeComponent, {
      maxWidth: this.dialogWidth(),
      data: atividade
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(data);
  }

  dialogWidth() {
    if (window.innerWidth <= 768) {
      return "100vw";
    } else {
      return "80vw";
    }
  }

}
