import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, forkJoin, of, throwError } from 'rxjs';
import { LoginService } from 'src/app/components/auth/services/login.service';
import { ServidoresComponent } from 'src/app/components/pages';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';
import { Graduacao, Orientador, Usuario } from 'src/app/shared';

@Component({
  selector: 'app-graduacoes-dialog',
  templateUrl: './graduacoes-dialog.component.html',
  styleUrls: ['./graduacoes-dialog.component.scss']
})
export class GraduacoesDialogComponent implements OnInit {
  exibir: boolean = true;
  userRole: string = '';
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  coordenador: FormControl = new FormControl();
  graduacao!: Graduacao;
  coordenadores: Orientador[] = [];

  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Graduacao>;
  constructor(@Inject(DIALOG_DATA) public data: Graduacao,
    private changeDetectorRef: ChangeDetectorRef,
    public graduacaoService: GraduacaoService,
    public orientadorService: OrientadorService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    private loginService: LoginService
  ) {
    if (data) {
      console.log(data);
      this.graduacao = data;
    }
  }
  ngOnInit(): void {
    if (this.loginService.usuarioLogado) {
      this.userRole = this.loginService.usuarioLogado.papel;
      this.exibir = true;
      this.usuarioLogado = this.loginService.usuarioLogado;
      this.instanciarGraduacao(this.usuarioLogado);
    } else {
      this.loginService.usuarioLogado$.subscribe(usuario => {
        if (usuario) {
          this.userRole = this.loginService.usuarioLogado.papel;
          this.exibir = true;
          this.instanciarGraduacao(usuario);
        }
      });
    }

    forkJoin({
      graduacao: this.buscarGraduacao(this.graduacao),
      coordenadores: this.buscarTodosOsOrientadores(this.graduacao)
    }).subscribe(({ graduacao, coordenadores }) => {
      if (graduacao) {
        this.graduacao = graduacao;
        this.id.setValue(graduacao.id);
        this.nome.setValue(graduacao.nome);
      }
      if (coordenadores) {
        this.coordenadores = coordenadores;
        this.coordenador.setValue(graduacao.coordenador);
        this.syncCoordenador();
        console.log(graduacao, coordenadores);
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  instanciarGraduacao(user: Usuario) {
    this.orientadorService.buscarOrientadorPorId(user.id).subscribe(
      (res: Orientador) => {
        this.graduacao = res.graduacao;
      },
      (err) => { }
    );
  }

  syncCoordenador() {
    const matchedCoordenador = this.coordenadores.find(op => op.id === this.graduacao.coordenador.id);
    if (matchedCoordenador) {
      this.coordenador.setValue(matchedCoordenador);
    }
  }

  gradForm = new FormGroup({
    nomeDoCurso: this.nome,
    coordenador: this.coordenador,
  });

  saveGraduation() {
    this.graduacao.nome = this.nome.value;
    if (this.graduacao.coordenador.id !== this.coordenador.value) {
      this.atualizarPapeisOrientadores().subscribe(
        () => {
          this.graduacao.coordenador = this.coordenador.value;
          this.salvarOuAtualizarGraduacao();
        },
        (err) => {
          this.toastr.error('Erro ao atualizar os papéis dos orientadores: ' + err.message);
          console.log('Erro ao atualizar os papéis dos orientadores!', err);
        }
      );
    } else {
      this.salvarOuAtualizarGraduacao();
    }
  }

  private salvarOuAtualizarGraduacao() {
    if (this.graduacao.id) {
      this.atualizarGraduacao(this.graduacao).subscribe(
        (res: Graduacao) => {
          this.graduacao = res;
          this.toastr.success('Graduacao atualizada com sucesso!');
        },
        (err) => {
          this.toastr.error('Erro ao atualizar Graduacao: ' + err.message);
          console.log('Erro ao atualizar Graduacao!', err);
        }
      );
    } else {
      this.salvarGraduacao(this.graduacao).subscribe(
        (res: Graduacao) => {
          this.graduacao = res;
          this.toastr.success('Graduacao salva com sucesso!');

        },
        (err) => {
          this.toastr.error('Erro ao salvar Graduacao: ' + err.message);
          console.log('Erro ao salvar Graduacao!', err);
        }
      );
    }
  }

  atualizarPapeisOrientadores(): Observable<any> {
    if (this.graduacao.coordenador) {
      const observables: Observable<any>[] = [];

      const orientadorAntigo = this.graduacao.coordenador;
      orientadorAntigo.papel = 'ORIENTADOR';
      let cloneGraduacaoAntiga = new Graduacao();
      cloneGraduacaoAntiga.id = this.graduacao.id;
      orientadorAntigo.graduacao = cloneGraduacaoAntiga;
      observables.push(this.atualizarOrientador(orientadorAntigo));

      const novoCoordenador = this.graduacao.coordenador;
      novoCoordenador.papel = 'COORDENADOR';
      let cloneGraduacaoNova = new Graduacao();
      cloneGraduacaoNova.id = this.graduacao.id;
      novoCoordenador.graduacao = cloneGraduacaoNova;
      observables.push(this.atualizarOrientador(novoCoordenador));

      return forkJoin(observables).pipe(
        catchError((err) => {
          this.toastr.error('Erro ao atualizar os papéis dos orientadores: ' + err.message);
          console.log('Erro ao atualizar os papéis dos orientadores!', err);
          return throwError(err);
        })
      );
    }

    return of(null); // Retorna um Observable vazio se não houver coordenador
  }

  deleteGraduation() {
    this.changeDetectorRef.detectChanges();
    window.location.reload();
  }
  usuarioLogado: Usuario = new Usuario();

  openDialog() {
    const dialogRef = this.dialog.open(ServidoresComponent, {
      minWidth: '50%',
      data: { idGrad: this.graduacao.id, idCoord: this.usuarioLogado.id },

    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  cancel() {

  }

  salvarGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.inserirGraduacao(graduacao);
  }

  atualizarGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.atualizarGraduacao(graduacao);
  }

  removerGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.removerGraduacao(graduacao.id);
  }

  buscarGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.buscarGraduacaoPorId(graduacao.id);
  }

  buscarTodosOsOrientadores(graduacao: Graduacao): Observable<Orientador[]> {
    return this.orientadorService.listarTodosOrientadoresPorGraducao(graduacao.id);
  }

  atualizarOrientador(orientador: Orientador): Observable<Orientador> {
    return this.orientadorService.atualizarOrientador(orientador);
  }

}
