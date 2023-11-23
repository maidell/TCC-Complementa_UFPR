import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Aluno, Graduacao, Login, Orientador, Servidor, Usuario } from 'src/app/shared';
import { AlunoService } from '../../../services/aluno/services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { LoginService } from '../../auth/services/login.service';
import { UsuarioService } from '../../../services/usuario/services/usuario.service';
import { ServidorService } from '../../../services/servidor/services/servidor.service';
import { OrientadorService } from '../../../services/orientador/services/orientador.service';
import { ToastrService } from 'ngx-toastr';
import { GraduacaoService } from '../../../services/graduacao/services/graduacao.service';

@Component({
  selector: 'app-cadastro-de-usuarios',
  templateUrl: './cadastro-de-usuarios.component.html',
  styleUrls: ['./cadastro-de-usuarios.component.scss']
})
export class CadastroDeUsuariosComponent implements OnInit {

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
  papeis: string[] = ["Administrador", "Aluno", "Servidor", "Orientador"];
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
    private usuarioService: UsuarioService,
    private servidorService: ServidorService,
    private orientadorService: OrientadorService,
    private loginService: LoginService,
    private graduacaoService: GraduacaoService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;
    if (this.usuarioLogado.papel !== 'ADMIN') {
      this.router.navigate([`${this.loginService.usuarioLogado.papel}`]);
    }
    this.listarCursos()

  }

  cadastrarUsuario(formUsuario: NgForm): void {
    if (formUsuario.valid) {
      this.aluno.graduacao = this.graduacao;
      switch (this.papel) {
        case "Administrador":
          this.cadastrarAdministrador(formUsuario);
          break;
        case "Aluno":
          this.cadastrarAluno(formUsuario);
          break;
        case "Servidor":
          this.cadastrarServidor(formUsuario);
          break;
        case "Orientador":
          this.cadastrarOrientador(formUsuario);
          break;
        default: break;
      }
    }
  }

  listarCursos(): void {
    this.graduacaoService.listarTodasGraduacoes().subscribe(
      (response) => {
        this.options = response;
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

  cadastrarAdministrador(form: NgForm): void {
    if (form.valid) {
      this.admin.nome = this.nome;
      this.admin.email = this.email;
      this.admin.telefone = this.telefone;
      this.admin.papel = "ADMIN";
      this.usuarioService.inserirUsuario(this.admin).subscribe(
        (response) => {
          this.toastr.success(`Usuário cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao cadastrar administrador");
          console.error("Erro ao cadastrar administrador:", error);
        }
      );
    }
  }

  cadastrarAluno(form: NgForm): void {
    if (form.valid) {
      this.aluno.nome = this.nome;
      this.aluno.email = this.email;
      this.aluno.telefone = this.telefone;
      this.aluno.papel = "ALUNO";
      this.aluno.grr = this.grr;
      this.aluno.graduacao = this.graduacao;
      this.alunoService.inserirAluno(this.aluno).subscribe(
        (response) => {
          this.toastr.success(`Aluno cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao cadastrar aluno");
          console.error("Erro ao cadastrar aluno:", error);
        }
      );
    }
  }

  cadastrarServidor(form: NgForm): void {
    if (form.valid) {
      this.servidor.nome = this.nome;
      this.servidor.email = this.email;
      this.servidor.telefone = this.telefone;
      this.servidor.papel = "SERVIDOR";
      this.servidor.matricula = this.matricula;
      this.servidorService.inserirServidor(this.servidor).subscribe(
        (response) => {
          this.toastr.success(`Servidor cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao cadastrar servidor");
          console.error("Erro ao cadastrar servidor:", error);
        }
      );
    }
  }

  cadastrarOrientador(form: NgForm): void {
    if (form.valid) {
      this.orientador.nome = this.nome;
      this.orientador.email = this.email;
      this.orientador.telefone = this.telefone;
      this.orientador.papel = "ORIENTADOR";
      this.orientador.matricula = this.matricula;
      this.orientador.graduacao = this.graduacao;
      this.orientadorService.inserirOrientador(this.orientador).subscribe(
        (response) => {
          this.toastr.success(`Orientador cadastrado! Um e-mail com a senha foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao cadastrar orientador");
          console.error("Erro ao cadastrar orientador:", error);
        }
      );
    }
  }

}
