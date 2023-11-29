import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DownloadService } from '../download.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from "jspdf";
import { AtividadeService } from '../services/atividade.service';
import { LoginService } from '../../auth/services/login.service';
import { ComentarioService } from '../../../services/comentario/services/comentario.service';
import { OrientadorService } from '../../../services/orientador/services/orientador.service';
import { Anexo } from 'src/app/shared/models/anexo.model';
import { AnexoService } from '../../../services/anexo/services/anexo.service';
import { Aluno, Atividade, Certificado, Comentario, Competencia, Complexidade, Contestacao, Graduacao, Orientador, Projeto, Usuario } from 'src/app/shared';
import { ContestacaoCargaHoraria } from 'src/app/shared/models/contestacao-carga-horaria.model';
import { RelatorioDeConclusao } from 'src/app/shared/models/relatorio-de-conclusao.model';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { GraduacaoService } from '../../../services/graduacao/services/graduacao.service';
import { ComplexidadeService } from 'src/app/services/complexidade/services/complexidade.service';
import { RelatorioDeConclusaoService } from 'src/app/services/relatorio-de-conclusao/services/relatorio-de-conclusao.service';
import { ContestacaoCargaHorariaService } from 'src/app/services/contestacao-carga-horaria/services/contestacao-carga-horaria.service';
import { ContestacaoService } from 'src/app/services/contestacao/services/contestacao.service';
import { AlunoService } from 'src/app/services/aluno/services/aluno.service';
import { CertificadoService } from 'src/app/services/certificado/services/certificado.service';


@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit{

  doc = new jsPDF({
    orientation: "landscape",
    unit: "mm"
  });



  atividade = new Atividade();
  complexidadeAtividade = new Complexidade();
  project: Projeto = new Projeto();
  orientador: Orientador = new Orientador();
  graduacao: Graduacao[] = [];
  contestacao: ContestacaoCargaHoraria = new ContestacaoCargaHoraria();
  relatorioConclusao: RelatorioDeConclusao = new RelatorioDeConclusao();
  comentarios: Comentario[] = [];
  complexidades: Complexidade[] = [];
  competencias: Competencia[] = [];


  usuarioSistema: Usuario = new Usuario(undefined, "Admin", undefined, undefined, undefined, undefined);
  comentarioSistema: Comentario = new Comentario(undefined, this.usuarioSistema, undefined);





  usuarioLogado: Usuario = new Usuario();
  onlineUserId = 1;

  estado!: string;

  isReadingContest = false;

  isEditing = false;
  disputingHours = false;
  disputingExecution = false;
  readingHoursDispute = false;
  displayActivityHeaderData = false;
  activityNameLabel='Nome da Atividade';

  displayStatus = true;
  isMultiple=true;

  statusButtonColor = '';

  buttonsMarginTop = '1%';

  firstButtonColor = '';
  firstHeaderButton = '';
  firstButtonWidth = '';
  displayFirstHeaderButton = '';


  secondButtonColor = '';
  secondHeaderButton = '';
  displaySecondHeaderButton = '';

  displayTimestamp = '';

  isDisabled = true;

  displayComments = 'none';
  displaySecondLine = '';
  displayDates = '';

  activityFormWidth = '100%';
  commentsFormWidth = '0';

  projectName = "Nome do Projeto";

  descriptionLabel = "Descrição da Atividade";

  hoursOffered = '';

  somethingData = {
    description: "",
    competences: [""],
    complexity: "",
    candidatureLimitDate: "",
    submitLimitDate: "",
    contestDate: ""
  };

  commentForm!: FormGroup;

  commentValue = '';

  // esse formgroup serve pra ativar e desativar o form de acordo com o estado. precisa ter os formcontrols dentro senão quebra
  activityForm = new FormGroup({
    description: new FormControl(),
    courses: new FormControl(),
    competences: new FormControl(),
    complexities: new FormControl(),
    candidatureDate: new FormControl(),
    submitDate: new FormControl(),
    contestDate: new FormControl(),
    disputedHoursValue: new FormControl(),
    proposedHours: new FormControl(),
    complexitiesContest: new FormControl(),
  });

  // FormControl pra poder acessar o valor digitado no input
  activityName: FormControl = new FormControl();
  description: FormControl = new FormControl();
  courses: FormControl = new FormControl([]);
  competences: FormControl = new FormControl();
  complexities: FormControl = new FormControl();
  complexityName: FormControl = new FormControl();
  candidatureDate: FormControl = new FormControl();
  submitDate: FormControl = new FormControl();
  contestDate: FormControl = new FormControl();
  uploadFile: FormControl = new FormControl();
  complexitiesContest: FormControl = new FormControl();


  disputedHoursValue: FormControl = new FormControl("");
  proposedHours: FormControl = new FormControl();

  creationDate!: Date;
  datePipe!: DatePipe;


  fillingReport = false;
  isReadingReport = false;



  file_store!: FileList;
  file_list: Array<string> = [];

  options: Graduacao[] = [];


  constructor(
    private router: Router,
    private downloadService: DownloadService,
    public dialog: MatDialogRef<AtividadeComponent>,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    public complexidadeService: ComplexidadeService,
    public relatoriodeConclusaoService: RelatorioDeConclusaoService,
    public contestacaoCargaHorariaService: ContestacaoCargaHorariaService,
    public certificadoService: CertificadoService,
    public alunoService: AlunoService,
    public contestacaoExecucaoService: ContestacaoService,
    public atividadeService: AtividadeService,
    private graduacaoService: GraduacaoService,
    public loginService: LoginService,
    public comentarioService: ComentarioService,
    public orientadorService: OrientadorService,
    public anexoService: AnexoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data.atividade){
      this.atividade=data.atividade;
      this.complexidadeAtividade=data.atividade.complexidade;
      this.graduacao=data.atividade.graduacoes;

    }
    if (data.projeto){
      this.project = data.projeto;
    }

  }


  ngOnInit() {
    if (!this.loginService.usuarioLogado) {
      this.router.navigate([`/login`]);
    }
    forkJoin({
      cursos: this.listarCursos(),
      complexidades: this.listarComplexidades(),
    }).subscribe(({cursos, complexidades}) => {
        this.options=cursos;
        console.log("entrou no subscribe");
        this.complexidades=complexidades;
        console.log("populou as complexidades");
        this.syncComplexidade();
        console.log("saiu do sync complexidade");
        this.setHeaderContent();
        console.log("saiu do set header");
        this.setContent();
        //this.syncGraduacoes();

    });

    this.usuarioLogado = this.loginService.usuarioLogado;
    console.log("graduacoes:" + this.atividade.graduacoes);



    console.log(this.atividade);
    console.log(this.project);

  }

  instanciarAtividade(id: number | undefined) {
    if (id === undefined) {
      this.showErrorToastr("Erro ao instanciar Atividade");
      console.error("Erro ao instanciar Atividade");
    } else {
      this.atividadeService.buscarAtividadePorId(id).subscribe(
        (response: Atividade) => {
          this.atividade = response;
          this.showSuccessToastr("Atividade completa instanciada")
        },
        (error: any) => {
          this.toastr.error("Erro ao instanciar Atividade");
          console.error("Erro ao instanciar Atividade: ", error);
        }
      );
    }
  }



  //controle de dados do header e do conteudo
  setHeaderContent() {
    console.log("entrou no set header");
    switch (this.atividade.status) {
      case '':  // tela de criação de atividades
        this.statusButtonColor = 'linear-gradient(#3473a3,#5b7ba5)';
        this.displayStatus = false;
        this.displayActivityHeaderData=true;
        this.buttonsMarginTop = '3%';
        this.firstHeaderButton = 'Salvar';
        this.firstButtonColor = 'linear-gradient(#559958, #418856)';
        this.displaySecondHeaderButton = 'none';
        this.firstButtonWidth = '100%';

        break;
      case 'ABERTA':
        this.statusButtonColor = 'linear-gradient(#3473A3, #5B7BA5';

        if (this.canUserEdit()) {
          this.firstHeaderButton = 'Visualizar Candidaturas';
          this.secondHeaderButton = 'Editar';
          this.secondButtonColor = 'linear-gradient(#CC6E00,#D95409)';

        } else {
          if (this.usuarioLogado.papel === 'ALUNO') {
            this.firstHeaderButton = 'Candidatar-se';
            this.firstButtonWidth = '100%';
            this.displaySecondHeaderButton = 'none';
          } else {
            this.displayFirstHeaderButton = 'none';
            this.displaySecondHeaderButton = 'none';
          }

        }


        this.firstButtonColor = 'linear-gradient(#2494D3,#0076D0)';

        break;
      case 'EM_EXECUCAO':
        console.log(this.atividade.relatorioDeConclusao);
        this.statusButtonColor = 'linear-gradient(#DEB345, #C99614)';

        if (this.canUserEdit()) {


          if (this.atividade.relatorioDeConclusao) {
            this.showInfoToastr("Essa atividade possui um relatório de Conclusão. Clique em \"Finalizar\" para visualizar");
            this.firstButtonWidth = '100%';
            this.firstHeaderButton = 'Finalizar';
            this.firstButtonColor = 'linear-gradient(#2494D3,#0076D0)';
            this.displaySecondHeaderButton = 'none';

          } else {
            this.displayFirstHeaderButton = 'none';
            this.displaySecondHeaderButton = 'none';
          }

        } else {

          if (this.atividade.relatorioDeConclusao) {
            this.displayFirstHeaderButton = 'none';
            this.displaySecondHeaderButton = 'none';

          } else {
            this.firstHeaderButton = 'Concluir';
            this.firstButtonWidth = '100%';
            this.firstButtonColor = 'linear-gradient(#2494D3,#0076D0)';
            this.displaySecondHeaderButton = 'none';
            if (this.disputingHours) {
              this.firstHeaderButton = "Contestar Carga Horária";
              this.firstButtonColor = 'linear-gradient(#CC6E00,#D95409)';
            }
          }

        }

        break;
      case 'CARGA_HORARIA_CONTESTADA': case 'EXECUCAO_CONTESTADA':
        this.statusButtonColor = 'linear-gradient(#CC6E00, #D95409)';



        if (this.canApproveContest()) {

          if (this.isReadingContest) {
            this.firstButtonWidth = '';
            this.firstHeaderButton = 'Aprovar';
            this.firstButtonColor = 'linear-gradient(#318B35, #297E42)';
            this.displaySecondHeaderButton = '';

            this.secondHeaderButton = 'Recusar';
            this.secondButtonColor = 'linear-gradient(#CC6E00, #D95409)';
          } else {
            this.displayFirstHeaderButton = '';
            this.firstHeaderButton = "Ler Contestação";
            this.firstButtonColor = 'linear-gradient(#2494D3,#0076D0)';
            this.firstButtonWidth = '100%';
            this.displaySecondHeaderButton = 'none';
          }
        } else {
          this.displayFirstHeaderButton = 'none';
          this.displaySecondHeaderButton = 'none';
        }




        break;
      case 'FINALIZADA':
        this.statusButtonColor = 'linear-gradient(#318B35, #297E42)';
        this.secondHeaderButton = 'Gerar Certificado';
        this.displayTimestamp = 'none';
        this.displayFirstHeaderButton = 'none';
        this.statusButtonColor = 'linear-gradient(#318B35, #297E42)';
        this.secondButtonColor = 'linear-gradient(#559958, #418856)';
        break;
    }
    console.log("saiu do set Header");
  }

  setContent() {
    console.log("entrou no set content");
    switch (this.atividade.status) {
      case '':
        this.activityForm.enable();
        this.isDisabled=false;
        break;   
      case 'ABERTA':
        this.activityForm.disable();
        this.activityName.setValue(this.atividade.nome);
        this.description.setValue(this.atividade.descricao);
        this.competences.setValue(this.atividade.competencia);

        console.log(this.atividade.complexidade?.nome);
        this.syncGraduacoes();


        this.candidatureDate.setValue(this.atividade.dataLimiteCandidatura);
        this.submitDate.setValue(this.atividade.dataConclusao);
        this.contestDate.setValue(this.atividade.contestacao?.dataContestacao);

        this.displayComments = 'none';
        break;
      case 'EM_EXECUCAO':
        this.displayComments = '';
        this.description.setValue(this.atividade.descricao);
        this.competences.setValue(this.atividade.competencia?.nome);

        if (this.atividade.complexidade?.nome != undefined) {
          this.activityForm.get('complexities')?.setValue(this.atividade.complexidade.nome);
        }

        this.candidatureDate.setValue(this.atividade.dataLimiteCandidatura);
        this.submitDate.setValue(this.atividade.dataConclusao);
        this.contestDate.setValue(this.atividade.contestacao?.dataContestacao);

        this.activityForm.disable();

        if (this.canUserEdit() && this.atividade.relatorioDeConclusao != null) {
          this.comentarioSistema.comentario = "Essa atividade já possui um relatório de conclusão. Clique em \"Finalizar\" para saber mais";
          this.comentarios.push();
        }

        break;
      case 'CARGA_HORARIA_CONTESTADA': case 'EXECUCAO_CONTESTADA': case 'FINALIZADA': 
        this.activityForm.disable();
        this.displayComments = '';
        break;
      


    }
    console.log("saiu do set content");


  }

  listarCursos(): Observable<Graduacao[]> {
    return this.graduacaoService.listarTodasGraduacoes();
  }

  listarComplexidades(): Observable<Complexidade[]> {
    return this.complexidadeService.listarTodosComplexidades();
  }

  // primeiro e segundo botão
  firstButtonFunction() {
    switch (this.atividade.status) {
      case '':
        this.saveActivity(); //ok
        break;
      case "ABERTA":

        if (!this.canUserEdit()) {
          this.registerCandidature(); //testar com guibor
        }

        if (this.isEditing) {
          this.saveEdit(); //ok
        }
        break;

      case "EM_EXECUCAO":


        if (!this.canUserEdit()) {

          if (!this.fillingReport) {
            this.fillReport(); //ok
          } else {
            if (this.disputingHours) {
              this.sendHoursDispute(); //testar com guibor
            } else {
              this.sendFinalReport(); //testar com guibor
            }
          }

        } else {

          if (this.atividade.relatorioDeConclusao != null) {

            if (this.isReadingReport && !this.disputingExecution) {
              this.approveReport(); //testar
            } else if (this.isReadingReport && this.disputingExecution){
                this.sendExecutionDispute(); //testar

            } else  {
              this.readConclusionReport();
            }

          } else {
            console.log("entrou no else do relatorio de conclusao");
          }

        }
        break;
      case 'CARGA_HORARIA_CONTESTADA': case 'EXECUCAO_CONTESTADA':

        if (this.canApproveContest()) {
          console.log("o usuario pode aprovar contestação");
          if (!this.isReadingContest) {
            console.log("o usuario não está lendo a contestação");
            this.readContest(); // testar
          } else {
            console.log("o usuario esta lendo a contestação");
            this.approveContest(); //testar
          }
        }
        break;

    }

  }

  secondButtonFunction() {
    switch (this.atividade.status) {
      case "ABERTA": //CASE PRONTO
        if (this.canUserEdit()) {
          if (!this.isEditing) {
            this.editActivity();
          } else {
            this.isEditing = false;
            this.displayActivityHeaderData=false;
            this.setHeaderContent();
            this.setContent();
          }
        }
        break;
      case "EM_EXECUCAO":

        if (this.fillingReport) {
          this.disputeHours();
        } else {
          if (this.disputingExecution) {
            !this.disputingExecution;
            this.setContent();
            this.setHeaderContent();
          } else {
            this.disputeExecution();
          }
        }
        break;
      case "CARGA_HORARIA_CONTESTADA": case "EXECUCAO_CONTESTADA":
        if (this.isReadingContest) {
          this.refuseContest();

        }

        break;
      case "FINALIZADA":
        if (this.usuarioLogado === this.atividade.executor) {
          this.generateCerticatePdf();
        }
        break;
    }

  }

  syncComplexidade() {
    console.log("entrou no sync complexidade");
    const matchedComplexidade = this.complexidades.find(cp => cp.id === this.atividade.complexidade?.id);
    if (matchedComplexidade) {
      this.complexidadeAtividade = matchedComplexidade;
      //this.changeDetectorRef.detectChanges();
      console.log("chegou aqui");
    }
    console.log(this.activityForm.get('complexities'));
  }


  syncGraduacoes() {
    if (this.atividade.graduacoes) {
        const graduacoesSelecionadas = this.atividade.graduacoes.filter(grad => 
            this.options.find(option => option.id === grad.id)
        );

        this.graduacao = graduacoesSelecionadas;
        this.courses.setValue(this.graduacao);
    }
}

  saveActivity() {

    if(this.description.value===null || this.courses.value === null || this.activityForm.get('complexities')?.value===null || this.candidatureDate.value===null || this.submitDate.value===null){
      console.log(this.file_store);
      this.showErrorToastr("Preencha todos os campos antes de salvar!");
    } else {
      let novaAtividade = new Atividade();
      novaAtividade.status="ABERTA";
      novaAtividade.nome = this.activityName.value;
      novaAtividade.projeto=this.project;
      novaAtividade.autor=this.usuarioLogado;
      novaAtividade.descricao = this.description.value;
      novaAtividade.graduacoes = this.courses.value;
      novaAtividade.complexidade = this.activityForm.get('complexities')?.value;
      novaAtividade.dataLimiteCandidatura = this.candidatureDate.value;
      novaAtividade.dataConclusao = this.submitDate.value;
      novaAtividade.dataCriacao = new Date();
      // console.log(this.activityForm.get('courses')?.value);
      // console.log(this.courses.value);
      console.log(novaAtividade);

      this.atividadeService.inserirAtividade(novaAtividade).subscribe(
        (res: Atividade) => {
          novaAtividade=res;
          let id = novaAtividade.id;
          console.log(id);
          if (res.id){
            for(let i=0;i< this.file_store.length;i++){
              this.anexoService.inserirAnexoAtividade(this.file_store[i], res.id).subscribe;
            }
          }
          this.showSuccessToastr("Atividade criada com Sucesso!");
          this.onNoClick();
        }

      );




      /**
      for(let i=0;i<this.file_store.length;i++){
        let anexo: Anexo = new Anexo();
        anexo.atividade=this.atividade;
        anexo.fileName=this.file_store[i].name;
        anexo.
      }*/


    }
    //let newActivity: Atividade = new Atividade(undefined,"atividade teste", "descricao teste",new Date("2023-11-27"),new Date("2023-12-01"), new Date("2023-12-31"),this.project );
    //this.atividadeService.inserirAtividade()
  }


  registerCandidature() {
    this.atividade.candidatos?.push(this.usuarioLogado);
    this.atividadeService.atualizarAtividade(this.atividade).subscribe(
      (res: Atividade) => {
        this.toastr.success("Candidatura registrada com sucesso!");
        this.onNoClick();
      }
    )
  }


  addComment(f: NgForm) {

    var commentContent: string = f.value.commentInput;
    let idAtividade = this.atividade.id;

    console.log(idAtividade, commentContent);

    if (commentContent != '' && idAtividade) {
      let comentario = new Comentario();
      comentario.usuario = this.usuarioLogado;
      comentario.comentario = commentContent;
      this.comentarioService.inserirComentario(comentario,idAtividade).subscribe(
        (res: Comentario)=> {
          this.showSuccessToastr("comentario inserido");
          this.comentarios.push(res);
          this.commentValue = '';
        }
      );

    }
  }





  // arquivos
  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? ` (+${l.length - 1} arquivos)` : "";
      this.uploadFile.patchValue(`${f.name}${count}`);
    } else {
      this.uploadFile.patchValue("");
    }
  }

  download(fileUrl: string, fileName: string): void {
    this.downloadService.downloadFile(fileUrl, fileName);
  }

  downloadAnexo(id: number, anexo: Anexo) {
    this.anexoService.downloadAnexoPorId(id).subscribe(
      (blob: Blob | MediaSource) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = anexo.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      (error: any) => {
        this.toastr.error('Erro ao baixar o arquivo');
        console.error('Erro ao baixar o arquivo', error);
      }
    );
  }

  uploadAnexoRelatorio(file: File, anexo: Anexo, relatorioid: number) {
    this.anexoService.inserirAnexoAtividade(file, relatorioid).subscribe(
      (response: any) => {
        console.log('Arquivo enviado com sucesso', response);
      },
      (error: any) => {
        console.error('Erro ao enviar arquivo', error);
      }
    );
  }



  //Edição
  editActivity() {
    this.isEditing = true;
    this.displayActivityHeaderData=true;
    this.setContent();
    this.showWarningToastr("ATENÇÃO: Fechar esta janela apagará todas as suas alterações");
      this.isDisabled = false;
      this.activityForm.enable();
      this.firstHeaderButton = 'Salvar';
      this.firstButtonColor = 'linear-gradient(#559958, #418856)';
      this.secondHeaderButton = "Cancelar";
      this.secondButtonColor = 'linear-gradient(#C7433F, #C7241F)';

  }

  saveEdit() {
    if(this.description.value===null || this.courses.value === null || this.activityForm.get('complexities')?.value===null || this.candidatureDate.value===null || this.submitDate.value===null){
      console.log(this.file_store);
      this.showErrorToastr("Preencha todos os campos antes de salvar!");
    } else {

      let novaAtividade = this.atividade;
      novaAtividade.nome = this.activityName.value;
      novaAtividade.descricao = this.description.value;
      novaAtividade.graduacoes = this.courses.value;
      novaAtividade.complexidade = this.activityForm.get('complexities')?.value;
      novaAtividade.dataLimiteCandidatura = this.candidatureDate.value;
      novaAtividade.dataConclusao = this.submitDate.value;
      novaAtividade.dataCriacao = new Date();
      this.atividadeService.atualizarAtividade(this.atividade).subscribe(
        (response: Atividade) => {
          console.log('Atividade salva com sucesso', response);
          this.showSuccessToastr("Atividade salva!");
      },
      (error: any) => {
        console.error('Erro ao enviar arquivo', error);
      }
    );

    this.isEditing = false;
    this.displayActivityHeaderData=false;
    this.setContent(); // essa sai também

    this.setHeaderContent(); // essa fica

    }
  }

  canUserEdit() {

    // Verifica se this.usuarioLogado é igual ao autor, orientador, servidoresOrientadores ou monitores
    let usuarioLogado = this.usuarioLogado;
    let autor = this.atividade.autor;
    let orientador = this.atividade.projeto?.orientador;
    var monitores = [] ;
    if(this.atividade.projeto?.monitores){
      for (let i = 0; i< this.atividade.projeto?.monitores?.length; i++){
        monitores.push(this.atividade.projeto?.monitores[i].id);
      }
   }


   if (usuarioLogado.id===autor?.id || usuarioLogado.id === orientador?.id || monitores.some(monitor => monitor === usuarioLogado.id)){
    console.log("true");
    return true;
   } else {
    console.log("false");
    return false;
   }


    // if (
    //   this.usuarioLogado === this.atividade.autor ||
    //   this.usuarioLogado === this.atividade.projeto?.orientador ||
    //   this.atividade.projeto?.orientador?.graduacao.servidoresCoordenadores.some(servidor => servidor === this.usuarioLogado) ||
    //   this.atividade.projeto?.monitores?.some(monitor => monitor === this.usuarioLogado)
    // ) {
    //   console.log("retornou true");
    //   return true;
    // } else {
    //   console.log("retornou false");
    //   return false;
    // }
  }

  // Carga Horária
  disputeHours() {
    console.log("entrou na função de contestar carga horária");
    this.disputingHours = true;

    this.projectName = "Contestação de Carga Horária";
    this.descriptionLabel = "Descrição da Contestação de Carga Horária";
    this.disputedHoursValue.setValue(this.atividade.complexidade?.nome + " (" + this.atividade.complexidade?.cargaHorariaMinima + "h - " + this.atividade.complexidade?.cargaHorariaMaxima + "h)");

    this.setHeaderContent();
  }

  sendHoursDispute() {
    if(this.atividade.complexidade === this.activityForm.get('complexitiesContest')?.value){
      this.showErrorToastr("Complexidade Proposta não pode ser igual a complexidade original!");
    } else {
      let contestacaoHoras = new ContestacaoCargaHoraria();
      contestacaoHoras.autor= this.usuarioLogado;
      contestacaoHoras.descricao = this.description.value;
      contestacaoHoras.dataContestacao=new Date();
      contestacaoHoras.tipoContestacao="CARGA_HORARIA";
      contestacaoHoras.status='ABERTA';
      if(this.atividade.complexidade?.cargaHorariaMaxima){
        contestacaoHoras.cargaHorariaOriginal=this.atividade.complexidade?.cargaHorariaMaxima;
      }
      /**this.contestacaoCargaHorariaService.inserirContestacaoCargaHoraria(contestacaoHoras, undefined).subscribe( //guibor
        (res: ContestacaoCargaHoraria) => {
          this.atividade.contestacaoCargaHoraria=res;
          this.atividade.status='CARGA_HORARIA_CONTESTADA';
          this.atividadeService.atualizarAtividade(this.atividade).subscribe(
            (res: Atividade) => {
              this.disputingHours = false;
              this.toastr.success("Contestação de Complexidade Realizada com sucesso!");
              this.onNoClick();
            }
          )
        }
      )
*/
    }


  }

  //Contestação de Execução
  disputeExecution() {
    this.disputingExecution = true;
    this.activityForm.enable();
    this.displaySecondLine = 'none';
    this.projectName = "Contestação de Execução";
    this.descriptionLabel = "Descrição da Contestação de Execução";
    this.firstHeaderButton = "Contestar Execução";
    this.firstButtonColor = 'linear-gradient(#CC6E00, #D95409)';
    this.secondHeaderButton = "Cancelar";
    this.secondButtonColor = 'linear-gradient(#C7433F, #C7241F)';
  }

  sendExecutionDispute() { 
    let contestacaoExecucao = new Contestacao();
    contestacaoExecucao.autor=this.usuarioLogado;
    contestacaoExecucao.dataContestacao=new Date();
    contestacaoExecucao.descricao=this.description.value;
    contestacaoExecucao.tipoContestacao='EXECUCAO';
    contestacaoExecucao.status='ABERTA';
    this.contestacaoExecucaoService.inserirContestacao(contestacaoExecucao).subscribe(
      (res: Contestacao) => {
        this.atividade.status="EXECUCAO_CONTESTADA";
        this.atividade.contestacao=res;
        this.atividadeService.atualizarAtividade(this.atividade).subscribe(
          (res: Atividade) => {
            this.toastr.warning("Contestação de Execução enviada");
          }
        )

      }
    )

  }

  //leitura e aprovação da contestação
  canApproveContest() {
    if (this.usuarioLogado.id === this.atividade.projeto?.orientador?.id){
      return true;
    } else {
      return false;
    }

  }

  readContest() {
    console.log(this.atividade.contestacao?.descricao);
    this.projectName = "Contestação";
    this.descriptionLabel = "Descrição da Contestação";
    this.displayComments = 'none';
    this.displaySecondLine = 'none';
    this.displayDates = 'none';
    this.isReadingContest = true;
    if (this.estado === 'Carga Horária Contestada') {
      this.readingHoursDispute = true;
    }
    if (this.atividade.contestacao?.descricao){
      this.description.setValue(this.atividade.contestacao?.descricao);
    }
    this.setHeaderContent();

  }

  approveContest() {

    if(this.atividade.status==='CARGA_HORARIA_CONTESTADA'){
      let contestacao=this.atividade.contestacaoCargaHoraria;
      this.contestacao.status='DEFERIDA';
      if(contestacao){
        this.contestacaoCargaHorariaService.atualizarContestacaoCargaHoraria(contestacao).subscribe(
          (res: ContestacaoCargaHoraria) => {
            this.atividade.contestacaoCargaHoraria=res;
            this.atividade.status='FINALIZADA';
            this.atividadeService.atualizarAtividade(this.atividade).subscribe(
              (res: Atividade) => {
                this.toastr.success("Contestação Aprovada!");
                this.onNoClick();
                this.isReadingContest = false;
              }
            )
          }
        )
      }

    } else if (this.atividade.status==='EXECUCAO_CONTESTADA'){
      let contestacao=this.atividade.contestacao;
      this.contestacao.status='DEFERIDA';
      if(contestacao){
        this.contestacaoExecucaoService.atualizarContestacao(contestacao).subscribe(
          (res: Contestacao) => {
            this.atividade.contestacao=res;
            this.atividade.status='FINALIZADA';
            this.atividadeService.atualizarAtividade(this.atividade).subscribe(
              (res: Atividade) => {
                this.toastr.success("Contestação Aprovada!");
                this.onNoClick();
                this.isReadingContest = false;

              }
            )
          }
        )
    }

    }
}

  refuseContest() {
    if(this.atividade.status==='CARGA_HORARIA_CONTESTADA'){
      let contestacao=this.atividade.contestacaoCargaHoraria;
      this.contestacao.status='INDEFERIDA';
      if(contestacao){
        this.contestacaoCargaHorariaService.atualizarContestacaoCargaHoraria(contestacao).subscribe(
          (res: ContestacaoCargaHoraria) => {
            this.atividade.contestacaoCargaHoraria=res;
            this.atividade.status='FINALIZADA';
            this.atividadeService.atualizarAtividade(this.atividade).subscribe(
              (res: Atividade) => {
                this.toastr.warning("Contestação Recusada!");
                this.onNoClick();
                this.isReadingContest = false;

              }
            )
          }
        )
      }

    } else if (this.atividade.status==='EXECUCAO_CONTESTADA'){
      let contestacao=this.atividade.contestacao;
      this.contestacao.status='INDEFERIDA';
      if(contestacao){
        this.contestacaoExecucaoService.atualizarContestacao(contestacao).subscribe(
          (res: Contestacao) => {
            this.atividade.contestacao=res;
            this.atividade.status='FINALIZADA';
            this.atividadeService.atualizarAtividade(this.atividade).subscribe(
              (res: Atividade) => {
                this.toastr.warning("Contestação Recusada!");
                this.onNoClick();
                this.isReadingContest = false;

              }
            )
          }
        )
    }
    }
  }


  //Relatório de Conclusão
  fillReport() {

    this.displayComments = 'none';
    this.projectName = 'Relatório de Conclusão';
    this.descriptionLabel = "Relatório de Conclusão";
    this.firstHeaderButton = "Enviar Relatório";
    this.displaySecondHeaderButton = '';
    this.secondHeaderButton = "Contestar Carga Horária";
    this.secondButtonColor = 'linear-gradient(#CC6E00, #D95409)';
    this.displayStatus = false;
    this.fillingReport = true;
    this.displaySecondLine = 'none';
    this.displayDates = 'none';
    this.activityForm.enable();

    this.activityForm.setValue({
      description: "",
      courses:[""],
      competences: [""],
      complexities: "",
      candidatureDate: "",
      submitDate: "",
      contestDate: "",
      disputedHoursValue: "",
      proposedHours: "",
      complexitiesContest: ""
    });


  }

  readConclusionReport() {
    console.log("entrou na função de finalizar");
    this.activityForm.disable();
    this.displayComments = 'none';
    this.projectName = 'Relatório de Conclusão';
    this.descriptionLabel = "Relatório de Conclusão";
    this.firstHeaderButton = "Finalizar Atividade";
    this.displaySecondHeaderButton = '';
    this.secondHeaderButton = "Contestar Execução";
    this.secondButtonColor = 'linear-gradient(#CC6E00, #D95409)';
    this.displayStatus = false;
    this.displayDates = 'none';
    this.isReadingReport = true;

    this.activityForm.setValue({
      description: "",
      courses:[""],
      competences: [""],
      complexities: "Simples (4h - 6h)",
      candidatureDate: "",
      submitDate: "",
      contestDate: "",
      disputedHoursValue: "",
      proposedHours: "",
      complexitiesContest:""
    });
    this.description.setValue(this.atividade.relatorioDeConclusao?.descricao);


  }

  sendFinalReport(): void {

    // var fd = new FormData();
    // this.file_list = [];
    // if (this.file_store) {

    //   for (let i = 0; i < this.file_store.length; i++) {
    //     fd.append("files", this.file_store[i], this.file_store[i].name);
    //     this.file_list.push(this.file_store[i].name);
    //   }
    //   for (let i = 0; i < this.file_store.length; i++) {
    //     console.log(this.file_store[i]);
    //     console.log(this.file_store[i].name);
    //   }
    // }

    let relatorio = new RelatorioDeConclusao();
    relatorio.descricao=this.description.value;

    this.relatoriodeConclusaoService.inserirRelatorioDeConclusao(relatorio).subscribe(
      (res: RelatorioDeConclusao) => {
        let reportId= res.id;
        if(reportId){
          for(let i = 0; i< this.file_store.length;i++){
            this.anexoService.inserirAnexoRelatorio(this.file_store[i],reportId).subscribe;
          }
          this.atividade.relatorioDeConclusao=res;
          console.log("Relatorio de conclusao BS", this.atividade)
          this.atividadeService.atualizarAtividade(this.atividade).subscribe(
            (res: Atividade) => {
              this.atividade = res;
              console.log("Relatorio de conclusao AS", this.atividade)
              this.showSuccessToastr("Relatório de Conclusão Enviado com Sucesso!");
            }
          );
        }
      }
    )


    this.toastr.success("Relatório de Conclusão Enviado!");
    this.onNoClick();
  }

  approveReport() {
    this.atividade.status='FINALIZADA';
    this.atividadeService.atualizarAtividade(this.atividade).subscribe(
      (res: Atividade) => {
        this.toastr.success("Atividade Concluída!");
        this.onNoClick();
      }
    )

    this.generateCertificate();



  }

  /** CERTIFICADO */

  generateCertificate(){
    let certificado = new Certificado();
    if(this.atividade.projeto){
      certificado.projeto=this.atividade.projeto.nome;
    }
    if (this.atividade.complexidade){
     certificado.horas=this.atividade.complexidade?.cargaHorariaMaxima
    }
    if (this.atividade.projeto?.orientador){
      certificado.orientador=this.atividade.projeto?.orientador.nome;
    }



  }

  generateCerticatePdf() {
    if(this.usuarioLogado.id===this.atividade.executor?.id){
      let aluno: Aluno = new Aluno();
      this.alunoService.buscarAlunoPorId(this.atividade.executor.id).subscribe(
        (res: Aluno)=>{
          aluno = res;

        }
      )

      }

    let grr = 20193878;
    let fullGrr = "GRR" + grr;


    this.doc.addImage('../assets/plugins/images/Certificado.jpg', "JPG", 0, 0, 297, 210);
    this.doc.setFontSize(18);
    this.doc.text("Leonardo Hortmann", 150, 100, { align: "center" });
    this.doc.setFontSize(12);
    this.doc.text(fullGrr, 150, 110, { align: "center" });
    this.doc.setFontSize(18);
    this.doc.text("Por sua participação e conclusão da atividade " + this.atividade.executor + " contribuindo para o desenvolvimento do projeto " + this.projectName + " disponível na plataforma Complementa UFPR, tendo duração de 12 horas", 150, 130, { align: "center", maxWidth: 180 });
    this.doc.text("Nome do Orientador", 150, 174, { align: "center" });

    this.doc.save("certificado.pdf");
    //Por sua participação e conclusão na atividade [nome da atividade]
    //contribuindo para o desenvolvimento do projeto
    //[nome do projeto] disponível na plataforma Complementa UFPR, tendo duração de [xx] horas.
  }

  /** TOASTR DE NOTIFICAÇÃO */
  showSuccessToastr(s: string) {
    this.toastr.success(s);
  }

  showInfoToastr(s: string) {
    this.toastr.info(s);
  }

  showWarningToastr(s: string) {
    this.toastr.warning(s);
  }

  showErrorToastr(s: string) {
    this.toastr.error(s);
  }

  // Fechar dialog
  onNoClick(): void {
    this.dialog.close();
  }



  compareGraduacoes(g1: any, g2: any): boolean {
    return g1 && g2 ? g1.id === g2.id : g1 === g2;
}


  compareComplexidades(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
