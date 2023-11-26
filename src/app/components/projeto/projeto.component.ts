import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno, Atividade, Graduacao, Monitor, Projeto, Usuario } from 'src/app/shared';
import { LoginService } from '../auth/services/login.service';
import { ProjetoService } from './services/projeto.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TitleService } from 'src/app/services/title/title.service';
import { AtividadeService } from '../atividade/services/atividade.service';
import { ServidoresComponent } from '../pages';
import { ListarAlunosComponent } from '../layout/listar-alunos/listar-alunos.component';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {
  imgAtv = "assets/plugins/images/atvImg.svg";
  isViewMode = false;
  idParam!: number;
  projeto: Projeto = new Projeto();
  alunos: Aluno[] = [];
  monitores: Monitor[] = [];
  tituloAtividade = "biding com nome da atv";
  executor = "biding com nome do executor";
  atividades: Atividade[] = [];
  buttonText = "Detalhes";

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private loginService: LoginService,
    private projetoService: ProjetoService,
    private route: ActivatedRoute,
    private title: TitleService,
    private atividadeService: AtividadeService
  ) {

  }
  openDialog() {

    try {
      this.dialog.open(ListarAlunosComponent, {
        width: this.dialogWidth(),
      });
    } catch (error) {
      console.error('Erro ao abrir o diálogo:', error);
    }
  }

  dialogWidth(): string {
    return '60%'; // Por exemplo, definindo uma largura fixa de 500px
  }

  usuarioLogado: Usuario = new Usuario();
  inputValue: string = '';


  ngOnInit() {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`/login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    this.idParam = +this.route.snapshot.params['id'];
    this.instanciarProjeto();
    this.setContent();
    this.title.setTitle("Detalhes do projeto");
    this.instanciarAtividades();
    //seta o titulo do projeto com o nome do projeto
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
  instanciarProjeto() {
    this.idParam = +this.route.snapshot.params['id'];

    this.projetoService.buscarProjetoPorId(this.idParam).subscribe(
      (res: Projeto) => {
        this.projeto = res;
        this.toastr.success(res.nome);
        console.log("Projeto instanciado com sucesso", res);

        // Criar FormGroup e definir FormControl após obter os dados do projeto
        this.projectForm = new FormGroup({
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

        // Definir os valores dos FormControl após criar o FormGroup
        this.setContent();
      },
      (err) => {
        console.log("Erro ao instanciar projeto", err);
        this.toastr.error("Erro ao instanciar projeto");
      }
    );
  }

  instanciarAtividades(): Observable<Atividade[]> {
    // // usa o toastr pra mostrar que a atividade foi instanciada
    this.atividadeService.listarTodasAtividadesDeProjeto(this.idParam).subscribe(
      (res: Atividade[]) => {
        this.atividades = res;
        this.toastr.success("Atividades recebidas com sucesso!");
        console.log("Atividades recebidas com sucesso!", res);
        return res;
      },
      (err) => {
        this.toastr.error("Erro ao listar atividades");
        console.log("Erro ao listar atividades", err);
        return err;
      }
    );
    return new BehaviorSubject<Atividade[]>([]);
  }

  setContent() {
    // Definir os valores dos FormControl após criar o FormGroup
    this.projectForm.patchValue({
      id: this.projeto?.id,
      nome: this.projeto?.nome,
      status: this.projeto?.status,
      tipo: this.projeto?.tipo,
      objetivoGeral: this.projeto?.objetivoGeral,
      objetivosEspecificos: this.projeto?.objetivosEspecificos,
      orientador: this.projeto?.orientador,
      alunos: this.projeto?.alunos,
      monitores: this.projeto?.monitores,
      // alunos: this.projeto.alunos!.map((aluno: Aluno) => aluno.id)

    });
  }
  salvar() { }
  cancelar() { }
  criarAtividade() { }
  editarAtividade() { }
  novaAtividade() { }
}









