import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno, Atividade, Graduacao, Monitor, Orientador, Projeto, Usuario } from 'src/app/shared';
import { LoginService } from '../auth/services/login.service';
import { ProjetoService } from './services/projeto.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TitleService } from 'src/app/services/title/title.service';
import { AtividadeService } from '../atividade/services/atividade.service';
import { ServidoresComponent } from '../pages';
import { ListarAlunosComponent } from '../layout/listar-alunos/listar-alunos.component';
import { InsertMonitorComponent } from '../layout/cards/insert-monitor/insert-monitor.component';
import { AtividadeComponent } from '../atividade/atividade/atividade.component';

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
  orientador: Orientador = new Orientador();
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
  openDialogMonitor() {
    if (!this.projeto.id) {
      this.toastr.warning("Você precisa salvar o projeto antes de adicionar monitores");
    }
    else if (this.projeto.id) {
      try {
        const dialogRef = this.dialog.open(InsertMonitorComponent, {
          width: this.getDialogWidth(),
          data: {
            projeto: this.projeto
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      } catch (error) {
        console.error('Erro ao abrir o diálogo:', error);
      }
    }
  }

  openDialogAluno() {
    //se o projeto não tiver id, não pode adicionar alunos
    if (!this.projeto.id) {
      this.toastr.warning("Você precisa salvar o projeto antes de adicionar alunos");
    }
    else if (this.projeto.id) {
      try {
        const dialogRef = this.dialog.open(ListarAlunosComponent, {
          width: this.getDialogWidth(),
          data: {
            projeto: this.projeto
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      } catch (error) {
        console.error('Erro ao abrir o diálogo:', error);
      }
    }
  }

  getDialogWidth(): string {
    let dialogWidth = '600px';
    if (window.innerWidth < 600) {
      dialogWidth = '90vw';
    }
    else if (window.innerWidth < 960) {
      dialogWidth = '80vw';
    }
    else if (window.innerWidth < 1280) {
      dialogWidth = '60vw';
    }
    else if (window.innerWidth < 1920) {
      dialogWidth = '40vw';
    }
    else {
      dialogWidth = '30vw';
    }
    return dialogWidth;
  }

  usuarioLogado: Usuario = new Usuario();
  inputValue: string = '';


  ngOnInit() {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`/login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    this.idParam = +this.route.snapshot.params['id'];
    //se NÃO for projeto novo, instancia o projeto e suas atividade, se for novo, instancia um projeto vazio
    if (this.idParam) {
      this.instanciarProjeto();
      this.instanciarAtividades();
    } else {
      this.projeto = new Projeto();
    }
    this.title.setTitle('Detalhes do Projeto');
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

  instanciarOrientador(){
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



  salvarProjeto(){
    this.projetoService.inserirProjeto(this.orientador).subscribe(
      (res: Projeto) => {
        this.projeto = res;
        this.toastr.success("Projeto salvo com sucesso!");
        console.log("Projeto salvo com sucesso!", res);
      },
      (err) => {
        this.toastr.error("Erro ao salvar projeto");
        console.log("Erro ao salvar projeto", err);
      }
    );
  }
  cancelar() {
    this.router.navigate([`/projetos/listar`]);
  }
  criarAtividade() { }
  editarAtividade() { }
  novaAtividade() {       
    const dialogRef = this.dialog.open(AtividadeComponent, {
    maxWidth: this.dialogWidth(),
    data: { atividade: new Atividade(), projeto: this.projeto }
  }); 
}



  dialogWidth() {
    if (window.innerWidth <= 768) {
      return "100vw";
    } else {
      return "80vw";
    }
  }


  adicionarAlunosEMonitores(alunosDoProjeto: Aluno[]) {
    let alunos: Aluno[] = [];
    let monitores: Aluno[] = [];

    alunos = alunosDoProjeto.filter(aluno => aluno.papel !== "Monitor");
    monitores = alunosDoProjeto.filter(aluno => aluno.papel === "Monitor");

    this.projeto.alunos = alunos;
    this.projeto.monitores = monitores;

  }

}









