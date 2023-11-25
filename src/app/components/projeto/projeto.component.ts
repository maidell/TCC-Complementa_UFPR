import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atividade, Projeto, Usuario } from 'src/app/shared';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit{
  imgAtv = "assets/plugins/images/atvImg.svg";
  isViewMode = false;

  tituloAtividade = "biding com nome da atv";
  executor = "biding com nome do executor";

  projectForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    status: new FormControl(''),
    tipo: new FormControl(''),
    objetivoGeral: new FormControl(''),
    objetivosEspecificos: new FormControl(''),
    orientador: new FormControl(''),
    alunos: new FormControl(''),
    monitores: new FormControl(''),
    curso: new FormControl(''),
  });


  // FormControl pra poder acessar o valor digitado no input
  id: FormControl = new FormControl('');
  nome: FormControl = new FormControl('');
  status: FormControl = new FormControl('');
  tipo: FormControl = new FormControl('');
  objetivoGeral: FormControl = new FormControl('');
  objetivosEspecificos: FormControl = new FormControl('');
  orientador: FormControl = new FormControl('');
  alunos: FormControl = new FormControl('');
  monitores: FormControl = new FormControl('');
  curso: FormControl = new FormControl('');


  @Input() projeto: Projeto | undefined; // Receberá os dados do projeto

  // Seção de formulário como já definido...

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private loginService: LoginService,

  ) { }

  usuarioLogado: Usuario = new Usuario();
  ngOnInit() {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`/login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;

    this.setContent();
  }
  salvar() { }
  cancelar() { }
  criarAtividade() { }
  setContent () {
    this.id.setValue(this.projeto?.id);
    this.nome.setValue(this.projeto?.nome);
    this.status.setValue(this.projeto?.status);
    this.tipo.setValue(this.projeto?.tipo);
    this.objetivoGeral.setValue(this.projeto?.objetivoGeral);
    this.objetivosEspecificos.setValue(this.projeto?.objetivosEspecificos);
    this.orientador.setValue(this.projeto?.orientador);
    this.alunos.setValue(this.projeto?.alunos);
    this.monitores.setValue(this.projeto?.monitores);
    this.curso.setValue(this.projeto?.curso);
  }
}









