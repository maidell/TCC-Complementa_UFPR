import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { NgForm, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe, formatDate } from '@angular/common';
import { DownloadService } from '../download.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from "jspdf";
import { AtividadeService } from '../services/atividade.service';
import { LoginService } from '../../auth/services/login.service';
import { ComentarioService } from '../../comentario/services/comentario.service';
import { OrientadorService } from '../../orientador/services/orientador.service';
import { Anexo } from 'src/app/shared/models/anexo.model';
import { AnexoService } from '../../anexo/services/anexo.service';
import { Atividade, Usuario } from 'src/app/shared';
import { ContestacaoCargaHoraria } from 'src/app/shared/models/contestacao-carga-horaria.model';
import { RelatorioDeConclusao } from 'src/app/shared/models/relatorio-de-conclusao.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent {
  doc = new jsPDF({
    orientation:"landscape",
    unit:"mm"
  });

  atividade: Atividade = new Atividade();
  contestacao: ContestacaoCargaHoraria = new ContestacaoCargaHoraria();
  relatorioConclusao: RelatorioDeConclusao = new RelatorioDeConclusao();
  
  exampleResponse=[
    {
      id: 1,
      nome: "Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste", 
      status: "Finalizada", // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
      dataCriacao: "2023-10-27T00:00:00.000-03:00",
      dataLimiteCandidatura: "2023-10-28T00:00:00.000-03:00",
      dataContestacao: null,
      dataConclusao: "2023-10-28T00:00:00.000-03:00",
      competencia: ["Competência 1", "Competência 2"],
      complexidade: "Média",
      comentarios: null,
      certificado: null,
      relatorioDeConclusao: "teste",
      anexos:[
        {name:'logo complementa light.svg', path:'../assets/plugins/images/logo_complementa_light.svg' }
      ]
  }];

  allowedUsers=[
    {id:1},
    {id: 3},
    {id: 4}
  ];

  
  usuarioLogado: Usuario = new Usuario();
  onlineUserId=1;

  estado: string =this.exampleResponse[0].status; 
  
  canApproveContest=true; // pode ou não aprovar a contestação
  isReadingContest=false;

  isEditing=false;
  disputingHours=false;
  disputingExecution=false;
  readingHoursDispute=false;

  displayStatus=true;

  statusButtonColor='';

  buttonsMarginTop='1%';

  firstButtonColor='';
  firstHeaderButton = '';
  firstButtonWidth='';
  displayFirstHeaderButton='';


  secondButtonColor='';
  secondHeaderButton = '';
  displaySecondHeaderButton = '';

  displayTimestamp = '';
  isDisabled=true;

  displayComments='none';
  displaySecondLine='';
  displayDates='';

  comments=[
    {name:'Leonardo Hortmann', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper.'},
    {name:'Mateus Maidel', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper.'}, {name:'Leonardo Hortmann', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper.'},
    ];

  activityFormWidth='100%';
  commentsFormWidth='0';

  projectName="Nome do Projeto";
  
  descriptionLabel="Descrição da Atividade";

  hoursOffered='';

  data={
    description:"",
    competences:[""],
    complexity:"",
    candidatureLimitDate:"",
    submitLimitDate:"",
    contestDate:""
  };

  exampleComplexities=['Simples','Média','Complexa'];


  commentForm!:FormGroup;

  commentValue='';

  // esse formgroup serve pra ativar e desativar o form de acordo com o estado. precisa ter os formcontrols dentro senão quebra
  activityForm = new FormGroup({
    description:  new FormControl(""),
    competences: new FormControl(['']),
    complexities: new FormControl(''),
    candidatureDate: new FormControl,
    submitDate: new FormControl,
    contestDate: new FormControl,
    disputedHoursValue: new FormControl,
    proposedHours: new FormControl
  });

  // FormControl pra poder acessar o valor digitado no input
  description: FormControl =  new FormControl("");
  competences: FormControl = new FormControl(['']);
  complexities: FormControl = new FormControl('');
  candidatureDate: FormControl = new FormControl();
  submitDate: FormControl = new FormControl();
  contestDate: FormControl = new FormControl();
  uploadFile: FormControl = new FormControl("");


  disputedHoursValue: FormControl = new FormControl("");
  proposedHours: FormControl = new FormControl();

  creationDate!: Date;
  datePipe!: DatePipe;


  fillingReport=false;
  isReadingReport=false;


  
  file_store!: FileList;
  file_list: Array<string> = [];


  constructor(
    private router: Router,
    private downloadService: DownloadService,
    public dialog: MatDialogRef<AtividadeComponent>,
    private toastr: ToastrService,
    public atividadeService: AtividadeService,
    public loginService: LoginService,
    public comentarioService: ComentarioService,
    public orientadorService: OrientadorService,
    public anexoService: AnexoService
    ){
    
    }



  ngOnInit(){
    if (!this.loginService.usuarioLogado){
      this.router.navigate([`/login`]);
    }
    this.usuarioLogado = this.loginService.usuarioLogado;
    // if (this.usuarioLogado.papel !== 'ALUNO' && this.usuarioLogado.papel !== 'ADMIN') {
    //   this.router.navigate([`${this.loginService.usuarioLogado.papel}`]);
    // }
    this.setHeaderContent();
    this.setContent();
  }


  dialogWidth(){
    if (window.innerWidth<=768){
      return "100vw";
    } else  {
      return "80vw";
    } 
  }
//controle de dados do header e do conteudo
  setHeaderContent(){
    switch (this.estado){
      case 'Nova':  // tela de criação de atividades
        this.statusButtonColor='linear-gradient(#3473a3,#5b7ba5)';
        this.displayStatus=false;
        this.buttonsMarginTop='3%';
        this.firstHeaderButton='Salvar';
        this.firstButtonColor='linear-gradient(#559958, #418856)';
        this.displaySecondHeaderButton='none';
        this.firstButtonWidth='100%';
        
        break;
      case 'Aberta': 
        this.statusButtonColor='linear-gradient(#3473A3, #5B7BA5';

        if(this.canUserEdit()){
          this.firstHeaderButton='Visualizar Candidaturas';
          this.secondHeaderButton='Editar';
          this.secondButtonColor='linear-gradient(#CC6E00,#D95409)';

        } else {
          this.firstHeaderButton='Candidatar-se';
          this.firstButtonWidth='100%';
          this.displaySecondHeaderButton='none';
        }


        this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
        
        break;
      case 'Em Execução': 
        this.statusButtonColor='linear-gradient(#DEB345, #C99614)';

        if(this.canUserEdit()){

          if(this.exampleResponse[0].relatorioDeConclusao!=null){
            this.showInfoToastr("Essa atividade possui um relatório de Conclusão. Clique em \"Finalizar\" para visualizar");
            this.firstButtonWidth='100%';
            this.firstHeaderButton='Finalizar';
            this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
            this.displaySecondHeaderButton='none';
        
          } else {
            this.displayFirstHeaderButton='none';
            this.displaySecondHeaderButton='none';
          }

        } else {

          if(this.exampleResponse[0].relatorioDeConclusao!=null){
            this.displayFirstHeaderButton='none';
            this.displaySecondHeaderButton='none';

          } else {
            this.firstHeaderButton='Concluir';
            this.firstButtonWidth='100%';
            this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
            this.displaySecondHeaderButton='none';
            if(this.disputingHours){
              this.firstHeaderButton="Contestar Carga Horária";
              this.firstButtonColor='linear-gradient(#CC6E00,#D95409)';
            }
          }

        }

        break;
      case 'Carga Horária Contestada': case 'Execução Contestada':
        this.statusButtonColor='linear-gradient(#CC6E00, #D95409)';
        console.log("entrou no case certo");

          
          if (this.canApproveContest){

            if(this.isReadingContest){
              this.firstButtonWidth='';
              this.firstHeaderButton='Aprovar';
              this.firstButtonColor='linear-gradient(#318B35, #297E42)';
              this.displaySecondHeaderButton='';
              
              this.secondHeaderButton='Recusar';
              this.secondButtonColor='linear-gradient(#CC6E00, #D95409)';
            } else {
              this.displayFirstHeaderButton='';
              this.firstHeaderButton="Ler Contestação";
              this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
              this.firstButtonWidth='100%';
              this.displaySecondHeaderButton='none';
            }
          } else {
            this.displayFirstHeaderButton='none';
            this.displaySecondHeaderButton='none';
          }
        



        break;
      case 'Finalizada':
        this.statusButtonColor='linear-gradient(#318B35, #297E42)';
        this.secondHeaderButton='Gerar Certificado';
        this.displayTimestamp='none';
        this.displayFirstHeaderButton='none';
        this.statusButtonColor='linear-gradient(#318B35, #297E42)';
        this.secondButtonColor='linear-gradient(#559958, #418856)';
        break;
    }
  }

  setContent(){
    switch(this.estado){
      case 'Nova':
        this.activityForm.enabled;
        this.isDisabled=false;
        break;
      case 'Aberta':
        this.description.setValue(this.exampleResponse[0].descricao);
        this.competences.setValue(this.exampleResponse[0].competencia);

        this.activityForm.get('complexities')?.setValue(this.exampleResponse[0].complexidade);
        
        this.candidatureDate.setValue(this.exampleResponse[0].dataLimiteCandidatura);
        this.submitDate.setValue(this.exampleResponse[0].dataConclusao);
        this.contestDate.setValue(this.exampleResponse[0].dataContestacao);

        this.displayComments='none';
        this.activityForm.disable();

        break;
      case 'Em Execução':

        this.activityFormWidth='65%';
        this.commentsFormWidth='35%';
        this.displayComments='';
        this.description.setValue(this.exampleResponse[0].descricao);
        this.competences.setValue(this.exampleResponse[0].competencia);

        this.activityForm.get('complexities')?.setValue(this.exampleResponse[0].complexidade);
        
        this.candidatureDate.setValue(this.exampleResponse[0].dataLimiteCandidatura);
        this.submitDate.setValue(this.exampleResponse[0].dataConclusao);
        this.contestDate.setValue(this.exampleResponse[0].dataContestacao);

        this.activityForm.disable();

        if(this.canUserEdit() && this.exampleResponse[0].relatorioDeConclusao!=null){
          this.comments.push({name:"Admin", content: "Essa atividade já possui um relatório de conclusão. Clique em \"Finalizar\" para saber mais"});
        }

        break;
      case 'Carga Horária Contestada':
          this.activityForm.disable();
          this.displayComments='';
        break;
      case 'Execução Contestada':
        break;
      case 'Finalizada':
        this.activityForm.disable();
        this.displayComments='';
        break;
    }

  }

// primeiro e segundo botão
  firstButtonFunction(){
    switch(this.estado){
      case "Nova":
        this.saveActivity();
      break;
      case "Aberta":

        if(!this.canUserEdit()){
          this.registerCandidature();
        }

        if(this.isEditing){
          this.saveEdit();
        }
      break;

      case "Em Execução":
        console.log("entrou no case em execução");

        if (!this.canUserEdit()){
          console.log("entrou no if (!this.canUserEdit()");
          if (!this.fillingReport){
            this.fillReport();
          } else {
            if(this.disputingHours){
              this.sendHoursDispute();
            } else {

              this.sendFinalReport();
            }
          }

        } else {

          if (this.exampleResponse[0].relatorioDeConclusao!=null){

            if(this.isReadingReport){
              this.approveReport();
              if(this.disputingExecution){
                this.sendExecutionDispute();
              }
            } else {
              this.readConclusionReport();
            }

          } else {
            console.log("entrou no else do relatorio de conclusao");
          }

        }
      break;
      case "Carga Horária Contestada": case "Execução Contestada":
        if(this.canApproveContest){
          if(!this.isReadingContest){
            this.readContest();
          } else {
            this.approveContest();
          }
        }

        break;

    }
    
  }

  secondButtonFunction(){
    switch (this.estado){
      case "Aberta": //CASE PRONTO
        if (this.canUserEdit()){
          if(!this.isEditing){
            this.editActivity();
          } else {
            this.isEditing=false;
            this.setHeaderContent();
            this.setContent();
          }
        }
        break;
      case "Em Execução":

        if(this.fillingReport){
          this.disputeHours();
        } else {
          if (this.disputingExecution){
            !this.disputingExecution;
            this.setContent();
            this.setHeaderContent();
          } else {
            this.disputeExecution();
          }
        }
        break;
        case "Carga Horária Contestada": case "Execução Contestada":
          if(this.isReadingContest){
            this.refuseContest();

          }

        break;
        case "Finalizada":
          this.generateCerticate();
          break;
    }

  }

  saveActivity(){
    this.showSuccessToastr("Atividade criada com sucesso!");
    this.onNoClick();
  }


  registerCandidature(){
    this.toastr.success("Candidatura registrada com sucesso!");
    this.onNoClick();
  }




  addComment(f: NgForm){
    
    var commentContent: string =f.value.commentInput;
    if(commentContent!= ''){
      var newComment={name:"Teste 1", content:commentContent}
      this.comments.push(newComment);
      this.commentValue='';
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



  //Edição
  editActivity(){
    this.showWarningToastr("ATENÇÃO: Fechar esta janela apagará todas as suas alterações");
    this.isEditing=true;
    if (this.canUserEdit()){
      this.isDisabled=false;
      this.activityForm.enable();
      this.data={
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
        competences:["Competência 1", "Competência 2", "Competência 3"],
        complexity:"Média",
        candidatureLimitDate:"13/11/2023",
        submitLimitDate:"03/12/2023",
        contestDate:""
      }
      this.firstHeaderButton='Salvar';
      this.firstButtonColor='linear-gradient(#559958, #418856)';
      this.secondHeaderButton="Cancelar";
      this.secondButtonColor='linear-gradient(#C7433F, #C7241F)';
    }
  }

  saveEdit(){
    //inserir os valores pulverizados dentro da instancia de atividade antes de enviar para a chamada do service

    this.atividadeService.atualizarAtividade(this.atividade).subscribe(
      (response: Atividade) => {
        console.log('Atividade salva com sucesso', response);
        this.showSuccessToastr("Atividade salva!");
      },
      (error: any) => {
        console.error('Erro ao enviar arquivo', error);
      }
    );
    
    this.isEditing=false;
    // substituir daqui pra baixo pela função de enviar pro banco

    this.exampleResponse[0].descricao=this.description.value;
    this.exampleResponse[0].status='Aberta';
    
    this.setContent(); // essa sai também
  
    this.setHeaderContent(); // essa fica
  }

  canUserEdit(){
    if (this.allowedUsers.some(user => user.id === this.onlineUserId)){
      return true;
    } else {
      return false;
    }
  }

  // Carga Horária
  disputeHours(){
    console.log("entrou na função de contestar carga horária");
    this.disputingHours=true;
    
    this.projectName="Contestação de Carga Horária";
    this.descriptionLabel="Descrição da Contestação de Carga Horária";
    this.disputedHoursValue.setValue("4 a 8 horas");

    this.setHeaderContent();
  }

  sendHoursDispute(){
    this.disputingHours=false;
    this.toastr.success("Contestação de Complexidade Realizada com sucesso!");
    this.onNoClick();
  }

  //Contestação de Execução
  disputeExecution(){
    console.log("entrou na função de contestar execução");
    this.disputingExecution=true;
    this.activityForm.enable();
    this.displaySecondLine='none';
    this.projectName="Contestação de Execução";
    this.descriptionLabel="Descrição da Contestação de Execução";
    this.firstHeaderButton="Contestar Execução";
    this.firstButtonColor='linear-gradient(#CC6E00, #D95409)';
    this.secondHeaderButton="Cancelar";
    this.secondButtonColor='linear-gradient(#C7433F, #C7241F)';
  }

  sendExecutionDispute(){
    this.toastr.warning("Contestação de Execução enviada");
  }

  //leitura e aprovação da contestação
  readContest(){
    this.projectName="Contestação";
    this.descriptionLabel="Descrição da Contestação";
    this.displayComments='none';
    this.displaySecondLine='none';
    this.displayDates='none';
    this.isReadingContest=true;
    if(this.estado==='Carga Horária Contestada'){
      this.readingHoursDispute=true;
    }
    this.setHeaderContent();
  }

  approveContest(){
    this.toastr.success("Contestação Aprovada!");
    this.onNoClick();
    this.isReadingContest=false;
  }

  refuseContest(){
    this.toastr.warning("Contestação Recusada");
    this.onNoClick();
    this.isReadingContest=false;
  }


  //Relatório de Conclusão
  fillReport(){

    this.displayComments='none';
    this.projectName='Relatório de Conclusão';
    this.descriptionLabel="Relatório de Conclusão";
    this.firstHeaderButton="Enviar Relatório";
    this.displaySecondHeaderButton='';
    this.secondHeaderButton="Contestar Complexidade";
    this.secondButtonColor='linear-gradient(#CC6E00, #D95409)';
    this.displayStatus=false;
    this.fillingReport=true;
    this.displaySecondLine='none';
    this.displayDates='none';
    this.activityForm.enable();

    this.activityForm.setValue({
      description:"",
      competences:[""],
      complexities:"",
      candidatureDate:"",
      submitDate:"",
      contestDate:"",
      disputedHoursValue:"",
      proposedHours:"",
    });


  }

  readConclusionReport(){
    console.log("entrou na função de finalizar");
    this.activityForm.disable();
    this.displayComments='none';
    this.projectName='Relatório de Conclusão';
    this.descriptionLabel="Relatório de Conclusão";
    this.firstHeaderButton="Finalizar Atividade";
    this.displaySecondHeaderButton='';
    this.secondHeaderButton="Contestar Execução";
    this.secondButtonColor='linear-gradient(#CC6E00, #D95409)';
    this.displayStatus=false;
    this.displayDates='none';
    this.isReadingReport=true;

    this.activityForm.setValue({
      description:"",
      competences:[""],
      complexities:"",
      candidatureDate:"",
      submitDate:"",
      contestDate:"",
      disputedHoursValue:"",
      proposedHours:""
    });
    

  }

  sendFinalReport(): void {

    var fd = new FormData();
    this.file_list = [];
    if(this.file_store){

      for (let i = 0; i < this.file_store.length; i++) {
        fd.append("files", this.file_store[i], this.file_store[i].name);
        this.file_list.push(this.file_store[i].name);
      }
      for (let i = 0; i < this.file_store.length; i++){
        console.log(this.file_store[i]);
        console.log(this.file_store[i].name);
      }
    }
    this.toastr.success("Relatório de Conclusão Enviado!");
    this.onNoClick();
  }

  approveReport(){
    this.toastr.success("Atividade Concluída!");
    this.onNoClick();
  }

  /** CERTIFICADO */
generateCerticate(){
  let grr=20193878;
  let fullGrr = "GRR" + grr;


  this.doc.addImage('../assets/plugins/images/Certificado.jpg',"JPG",0,0,297,210);
  this.doc.setFontSize(18);
  this.doc.text("Leonardo Hortmann",150,100,{align: "center"});
  this.doc.setFontSize(12);
  this.doc.text(fullGrr,150,110,{align: "center"});
  this.doc.setFontSize(18);
  this.doc.text("Por sua participação e conclusão da atividade " + this.exampleResponse[0].nome + " contribuindo para o desenvolvimento do projeto "+ this.projectName + " disponível na plataforma Complementa UFPR, tendo duração de 12 horas", 150,130,{align: "center", maxWidth:180});
  this.doc.text("Nome do Orientador", 150,174,{align:"center"});

  this.doc.save("certificado.pdf");
  //Por sua participação e conclusão na atividade [nome da atividade] 
  //contribuindo para o desenvolvimento do projeto 
  //[nome do projeto] disponível na plataforma Complementa UFPR, tendo duração de [xx] horas.
}

  /** TOASTR DE NOTIFICAÇÃO */
  showSuccessToastr(s: string) {
    this.toastr.success(s);
  }

  showInfoToastr(s: string){
    this.toastr.info(s);
  }

  showWarningToastr(s: string){
    this.toastr.warning(s);
  }

  showErrorToastr(s: string){
    this.toastr.error(s);
  }

  // Fechar dialog
  onNoClick(): void {
    this.dialog.close();
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

  instanciarAtividade(id: number){
    this.atividadeService.buscarAtividadePorId(id).subscribe(
      (response: Atividade) => {
        this.atividade = response;
      },
      (error: any) => {
        this.toastr.error("Erro ao instanciar Atividade");
        console.error("Erro ao listar Cursos:", error);
      }
    );
  }

}


