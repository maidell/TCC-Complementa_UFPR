import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno, Graduacao, Login, Orientador, Servidor, Usuario } from 'src/app/shared';
import { AlunoService } from '../../../services/aluno/services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { LoginService } from '../../auth/services/login.service';
import { UsuarioService } from '../../../services/usuario/services/usuario.service';
import { ServidorService } from '../../../services/servidor/services/servidor.service';
import { OrientadorService } from '../../../services/orientador/services/orientador.service';
import { ToastrService } from 'ngx-toastr';
import { GraduacaoService } from '../../../services/graduacao/services/graduacao.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss']
})
export class EditarUsuariosComponent implements OnInit {

  @ViewChild('formUsuario') formUsuario!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  usuarioLogado: Usuario = new Usuario();
  admin: Usuario = new Usuario();
  aluno: Aluno = new Aluno();
  servidor: Servidor = new Servidor();
  orientador: Orientador = new Orientador();

  nome: string = '';
  email: string = '';
  telefone: string = '';
  papel: string = '';
  grr: string = '';
  matricula: string = '';
  senhaValidacao: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  senhaValida: boolean = false;
  senhaAtualValida: boolean = false;
  mostrarValidacaoSenha: boolean = true;
  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;
  grrValido: boolean = true;

  options: Graduacao[] = [];
  graduacao!: Graduacao;

  hide: boolean = true;

  idUsuario!: number;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private usuarioService: UsuarioService,
    private servidorService: ServidorService,
    private orientadorService: OrientadorService,
    private loginService: LoginService,
    private graduacaoService: GraduacaoService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private title: TitleService
  ) { }

  ngOnInit(): void {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    this.idUsuario = this.route.snapshot.params['id'];
    if (this.usuarioLogado.papel !== "ADMIN") {
      this.toastr.info(this.usuarioLogado.papel);
      if (this.usuarioLogado.id != this.idUsuario) {
        this.router.navigate([""]); // está entrando nessa condição mesmo que o usuarioLogado.id seja o mesmo do query param
      } else {
        this.instanciarDetalhes(this.idUsuario);
        this.mostrarValidacaoSenha = true;
      }
    } else {
      this.instanciarDetalhes(this.idUsuario);
      this.mostrarValidacaoSenha = false;
      this.senhaAtualValida = true;
    }
    this.title.setTitle('Editar Usuário');
  }

  atualizarUsuario(formUsuario: NgForm): void {
    if (formUsuario.valid) {
      this.aluno.graduacao = this.graduacao;
      switch (this.papel) {
        case "Administrador":
          this.atualizarAdministrador(formUsuario);
          break;
        case "Aluno":
          this.atualizarAluno(formUsuario);
          break;
        case "Servidor":
          this.atualizarServidor(formUsuario);
          break;
        case "Orientador":
          this.atualizarOrientador(formUsuario);
          break;
        default: break;
      }
    }
  }

  listarCursos(): void {
    this.graduacaoService.listarTodasGraduacoes().subscribe(
      (response) => {
        this.options = response;
        this.syncGraduacao();
      },
      (error) => {
        console.error("Erro ao listar Cursos:", error);
      }
    );
  }

  public onPapelChange(selectedPapel: string): void {
    this.papel = selectedPapel;
  }

  validarGRR() {
    const regex = /^20\d{6}$/;
    this.grrValido = regex.test(this.aluno.grr);
  }

  validarSenhaAtual(): void {
    let login: Login = new Login();
    login.email = this.usuarioLogado.email;
    login.senha = this.senhaValidacao;
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

  atualizarAdministrador(form: NgForm): void {
    if (form.valid) {
      this.admin.nome = this.nome;
      this.admin.email = this.email;
      this.admin.telefone = this.telefone;
      if (this.senhaValida && this.senha === this.confirmarSenha && this.senha !== '') {
        this.admin.senha = this.senha;
      }
      this.usuarioService.atualizarUsuario(this.admin).subscribe(
        (response) => {
          this.toastr.success(`Administrador atualizado`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao atualizar administrador");
          console.error("Erro ao atualizar administrador:", error);
        }
      );
    }
  }

  atualizarAluno(form: NgForm): void {
    if (form.valid) {
      this.aluno.nome = this.nome;
      this.aluno.email = this.email;
      this.aluno.telefone = this.telefone;
      this.aluno.grr = this.grr;
      this.aluno.graduacao = this.graduacao;
      this.alunoService.atualizarAluno(this.aluno).subscribe(
        (response) => {
          this.toastr.success(`Aluno cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao atualizar aluno");
          console.error("Erro ao atualizar aluno:", error);
        }
      );
    }
  }

  atualizarServidor(form: NgForm): void {
    if (form.valid) {
      this.servidor.nome = this.nome;
      this.servidor.email = this.email;
      this.servidor.telefone = this.telefone;
      this.servidor.matricula = this.matricula;
      this.servidorService.atualizarServidor(this.servidor).subscribe(
        (response) => {
          this.toastr.success(`Servidor cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao atualizar servidor");
          console.error("Erro ao atualizar servidor:", error);
        }
      );
    }
  }

  atualizarOrientador(form: NgForm): void {
    if (form.valid) {
      this.orientador.nome = this.nome;
      this.orientador.email = this.email;
      this.orientador.telefone = this.telefone;
      this.orientador.matricula = this.matricula;
      this.orientador.graduacao = this.graduacao;
      this.orientadorService.atualizarOrientador(this.orientador).subscribe(
        (response) => {
          this.toastr.success(`Orientador cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao atualizar orientador");
          console.error("Erro ao atualizar orientador:", error);
        }
      );
    }
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

  syncGraduacao() {
    const matchedGraduacao = this.options.find(op => op.id === this.aluno.graduacao.id);
    if (matchedGraduacao) {
      this.graduacao = matchedGraduacao;
    }
    this.changeDetectorRef.detectChanges();
  }

  instanciarDetalhes(id: number) {
    this.usuarioService.buscarUsuarioPorId(id).subscribe(
      (response: Usuario) => {
        let usuario = response;
        switch (usuario.papel) {
          case 'ALUNO': {
            this.instanciarAluno(usuario.id);
            break;
          };
          case 'ORIENTADOR':
          case 'COORDENADOR': {
            this.instanciarOrientador(usuario.id);
            break;
          };
          case 'SERVIDOR': {
            this.instanciarServidor(usuario.id);
            break;
          };
          default: {
            this.instanciarAdmin(usuario);
          }
        }
      },
      (error: any) => {
        this.toastr.error("Erro ao recuperar dados");
        console.log("Erro ao recuperar dados", error);
      }
    );
  }

  instanciarAluno(id: number) {
    this.alunoService.buscarAlunoPorId(id).subscribe(
      (res: Aluno) => {
        this.aluno = res;
        this.nome = res.nome;
        this.email = res.email;
        this.telefone = res.telefone;
        this.papel = res.papel;
        this.graduacao = res.graduacao;
        this.grr = res.grr;
        this.listarCursos();
        this.changeDetectorRef.detectChanges();
        this.toastr.success("Detalhes carregados");
      },
      (err: any) => {
        console.log("Erro ao recuperar dados", err);
        this.toastr.error("Erro ao recuperar dados");
      }
    )
  }

  instanciarOrientador(id: number) {
    this.orientadorService.buscarOrientadorPorId(id).subscribe(
      (res: Orientador) => {
        this.orientador = res;
        this.nome = res.nome;
        this.email = res.email;
        this.telefone = res.telefone;
        this.papel = res.papel;
        this.graduacao = res.graduacao;
        this.matricula = res.matricula;
        this.listarCursos();
        this.changeDetectorRef.detectChanges();
        this.toastr.success("Detalhes carregados");
      },
      (err: any) => {
        console.log("Erro ao recuperar dados", err);
        this.toastr.error("Erro ao recuperar dados");
      }
    )
  }

  instanciarServidor(id: number) {
    this.servidorService.buscarServidorPorId(id).subscribe(
      (res: Servidor) => {
        this.servidor = res;
        this.nome = res.nome;
        this.email = res.email;
        this.telefone = res.telefone;
        this.papel = res.papel;
        this.matricula = res.matricula;
        this.toastr.success("Detalhes carregados");
      },
      (err: any) => {
        console.log("Erro ao recuperar dados", err);
        this.toastr.error("Erro ao recuperar dados");
      }
    )
  }

  instanciarAdmin(usuario: Usuario) {
    this.admin = usuario;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.telefone = usuario.telefone;
    this.papel = usuario.papel;
    this.mostrarValidacaoSenha = false;
    this.changeDetectorRef.detectChanges();
  }

  validarAlteracoes(usuario: Usuario | Aluno | Orientador | Servidor) {
    if (!this.mostrarValidacaoSenha) {
      if (this.senhaAtualValida) {
        this.verificarSenha();
      }
    }
    switch (usuario.papel) {
      case 'ADMIN': {
        if (this.senhaValida) {
          this.admin.senha = this.senha;
        }
        if (this.admin.nome !== this.nome && this.nome !== '') {
          this.admin.nome = this.nome;
        }
        if (this.admin.telefone !== this.telefone && this.telefone !== '') {
          this.admin.telefone = this.telefone;
        }
        break;
      }
      case 'ALUNO': {
        if (this.senhaValida) {
          this.aluno.senha = this.senha;
        }
        if (this.aluno.nome !== this.nome && this.nome !== '') {
          this.aluno.nome = this.nome;
        }
        if (this.aluno.telefone !== this.telefone && this.telefone !== '') {
          this.aluno.telefone = this.telefone;
        }
        if (this.aluno.grr !== this.grr && this.grr !== '') {
          this.aluno.grr = this.grr;
        }
        if (this.aluno.graduacao !== this.graduacao) {
          this.aluno.graduacao = this.graduacao;
        }
        break;
      }
      case 'COORDENADOR':
      case 'ORIENTADOR': {
        if (this.senhaValida) {
          this.orientador.senha = this.senha;
        }
        if (this.orientador.nome !== this.nome && this.nome !== '') {
          this.orientador.nome = this.nome;
        }
        if (this.orientador.telefone !== this.telefone && this.telefone !== '') {
          this.orientador.telefone = this.telefone;
        }
        if (this.orientador.matricula !== this.matricula && this.matricula !== '') {
          this.orientador.matricula = this.matricula;
        }
        if (this.orientador.graduacao !== this.graduacao) {
          this.orientador.graduacao = this.graduacao;
        }
        break;
      }
      case 'SERVIDOR': {
        if (this.senhaValida) {
          this.servidor.senha = this.senha;
        }
        if (this.servidor.nome !== this.nome && this.nome !== '') {
          this.servidor.nome = this.nome;
        }
        if (this.servidor.telefone !== this.telefone && this.telefone !== '') {
          this.servidor.telefone = this.telefone;
        }
        if (this.servidor.matricula !== this.matricula && this.matricula !== '') {
          this.servidor.matricula = this.matricula;
        }
        break;
      }
    }
  }

}
