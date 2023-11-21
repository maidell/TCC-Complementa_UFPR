import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno, Graduacao, Login, Usuario } from 'src/app/shared';
import { AlunoService } from '../services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { AtividadeComponent } from '../../atividade/atividade/atividade.component';
import { LoginService } from '../../auth/services/login.service';


@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.scss']
})
export class EditarAlunoComponent implements OnInit {

  @ViewChild('formAluno') formAluno!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  usuarioLogado: Usuario = new Usuario();
  aluno: Aluno = new Aluno();
  alunoLogado: Aluno = new Aluno();
  senha: string = '';
  confirmarSenha: string = '';
  senhaValida: boolean = false;
  senhaAtualValida: boolean = false;
  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;
  grrValido: boolean = true;
  myControl = new FormControl();
  options: Graduacao[] = [];
  graduacao!: Graduacao;
  selectedValue: string = '';
  filteredOptions!: Observable<Graduacao[]>;
  hide: boolean = true;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private loginService: LoginService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;
    if (this.usuarioLogado.papel !== 'ALUNO' && this.usuarioLogado.papel !== 'ADMIN') {
      this.router.navigate([`${this.loginService.usuarioLogado.papel}`]);
    }
    forkJoin({
      aluno: this.instanciarAluno(this.usuarioLogado.id),
      cursos: this.listarCursos()
    }).subscribe(({ aluno, cursos }) => {
      if (aluno) {
        this.alunoLogado = aluno;
        this.aluno = aluno;
      }
      this.options = cursos;
  
      this.syncGraduacao();
    });

  }

  instanciarAluno(id: number): Observable<Aluno> {
    return this.alunoService.buscarAlunoPorId(id);
  }

  validarSenhaAtual(): void {
    let login: Login = new Login();
    login.email = this.usuarioLogado.email;
    login.senha = this.alunoLogado.senha;
    this.loginService.validarSenha(login).subscribe(
      (response) => {
        let res: Boolean = response;
        this.senhaAtualValida = res.valueOf();
      },
      (error) => {
        console.error("Senha atual inválida:", error);
      }
    );
  }

  validarAlteracoes(aluno: Aluno) {
    if (this.senhaAtualValida) {
      this.verificarSenha();
      if (this.senhaValida) {
        this.alunoLogado.senha = this.senha;
      }
    }
    if(this.alunoLogado.nome !== aluno.nome && aluno.nome !== ''){
      this.alunoLogado.nome = aluno.nome;
    }
    if(this.alunoLogado.telefone !== aluno.telefone && aluno.telefone !== ''){
    this.alunoLogado.telefone = aluno.telefone;
    }
    if(this.alunoLogado.graduacao !== this.graduacao && aluno.graduacao.nome !== ''){
    this.alunoLogado.graduacao = this.graduacao;
    }
  }

  atualizarAluno(formAluno: NgForm): void {
    if (formAluno.valid) {
      this.aluno.graduacao = this.graduacao;
      this.validarAlteracoes(this.aluno);
      this.alunoService.atualizarAluno(this.alunoLogado).subscribe(
        (response) => {
          alert(`Alterações salvas com sucesso!`);
        },
        (error) => {
          console.error("Erro ao cadastrar aluno:", error);
        }
      );
    }
  }

  listarCursos(): Observable<Graduacao[]> {
    return this.alunoService.listarTodosCursos();
  }

  verificarSenha() {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    if (
      senhaRegex.test(this.senha) &&
      this.senha === this.confirmarSenha
    ) {
      this.senhaValida = true;
    } else {
      this.senhaValida = false;
    }
  }

  validarGRR() {
    const regex = /^20\d{6}$/;
    this.grrValido = regex.test(this.aluno.grr);
  }

  syncGraduacao() {
    const matchedGraduacao = this.options.find(op => op.id === this.aluno.graduacao.id);
    if (matchedGraduacao) {
      this.graduacao = matchedGraduacao;
    } 
  }

  /* CÓDIGO PRA TESTAR O COMPONENTE DE ATIVIDADE. EXCLUIR DAQUI PRA BAIXO QUANDO FOR PRA PRD*/

  openDialog() {
    const dialogRef = this.dialog.open(AtividadeComponent, {
      maxWidth: this.dialogWidth()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  dialogWidth() {
    if (window.innerWidth <= 768) {
      return "100vw";
    } else {
      return "80vw";
    }
  }

}
