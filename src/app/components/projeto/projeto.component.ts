import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atividade, Projeto, Usuario } from 'src/app/shared';
import { LoginService } from '../auth/services/login.service';
import { ProjetoService } from './services/projeto.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit{
  imgAtv = "assets/plugins/images/atvImg.svg";
  isViewMode = false;
  idParam!: number;
  projeto: Projeto = new Projeto();
  tituloAtividade = "biding com nome da atv";
  executor = "biding com nome do executor";

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private loginService: LoginService,
    private projetoService: ProjetoService,
    private route: ActivatedRoute
  ) { 

  }

  usuarioLogado: Usuario = new Usuario();
  ngOnInit() {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`/login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    this.idParam = +this.route.snapshot.params['id'];
    this.instanciarProjeto();
    this.setContent();
  }

  projectForm = new FormGroup({
    id: new FormControl(this.projeto?.id ?? ''),
    nome: new FormControl(this.projeto?.nome ?? ''),
    status: new FormControl(this.projeto?.status ?? ''),
    tipo: new FormControl(this.projeto?.tipo ?? ''),
    objetivoGeral: new FormControl(this.projeto?.objetivoGeral ?? ''),
    objetivosEspecificos: new FormControl(this.projeto?.objetivosEspecificos ?? ''),
    orientador: new FormControl(this.projeto?.orientador ?? ''),
    alunos: new FormControl(this.projeto?.alunos ?? ''),
    monitores: new FormControl(this.projeto?.monitores ?? '')
  });

  // FormControl pra poder acessar o valor digitado no input
  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  status: FormControl = new FormControl();
  tipo: FormControl = new FormControl();
  objetivoGeral: FormControl = new FormControl();
  objetivosEspecificos: FormControl = new FormControl();
  orientador: FormControl = new FormControl();
  alunos: FormControl = new FormControl();
  monitores: FormControl = new FormControl();
  curso: FormControl = new FormControl();

  // Seção de formulário como já definido...

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
  }

  instanciarProjeto(){
      this.projetoService.buscarProjetoPorId(this.idParam).subscribe(
        (res: Projeto) => {
          this.projeto = res;
          this.toastr.success(res.nome);
        },
        (err) => {
          console.log("Erro ao instanciar projeto", err);
          this.toastr.error("Erro ao instanciar projeto");
        }
      );
  }
}









