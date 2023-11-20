import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { NgForm, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe, formatDate } from '@angular/common';
import { DownloadService } from '../download.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent {
/**
 NOVA: DONE
 ABERTA - autor: DONE (Falta botão de visualizar candidaturas)
 ABERTA - EXECUTOR: DONE
 VISUALIZAR CANDIDATURAS
 EM EXECUÇÃO- autor - sem relatório de conclusão: DONE
 EM EXECUÇÃO - executor - sem relatório de conclusão: DONE
 relatório de conclusão - autor: DONE
 relatório de conclusão - executor: DONE
 Contestar carga horária: DONE
 Contestar Execução: DONE
 Aprovar Contestação: 
 Finalizada: DONE (Exceto botão de gerar certificado)
*/

  exampleResponse=[
    {
      id: 1,
      nome: "Teste", 
      status: "Em Execução", // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
      dataCriacao: "2023-10-27T00:00:00.000-03:00",
      dataLimiteCandidatura: "2023-10-28T00:00:00.000-03:00",
      dataContestacao: null,
      dataConclusao: "2023-10-28T00:00:00.000-03:00",
      competencia: ["Competência 1", "Competência 2"],
      complexidade: "Média",
      comentarios: null,
      certificado: null,
      relatorioDeConclusao: "TESTE",
      anexos:[
        {name:'logo complementa light.svg', path:'../assets/plugins/images/logo_complementa_light.svg' }
      ]
  }];

  allowedUsers=[
    {id:1},
    {id: 3},
    {id: 4}
  ];

  onlineUserId=1;

  estado: string =this.exampleResponse[0].status; 
  
  canApproveContest=true; // pode ou não aprovar a contestação


  isEditing=false;
  disputingHours=false;
  disputingExecution=false;

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
    contestDate: new FormControl
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


  constructor(private downloadService: DownloadService, public dialog: MatDialogRef<AtividadeComponent>, private toastr: ToastrService) {}



  ngOnInit(){
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
        if (this.canApproveContest){
          this.firstHeaderButton='Aprovar';
          this.firstButtonColor='linear-gradient(#318B35, #297E42)';

          this.secondHeaderButton='Recusar';
          this.secondButtonColor='linear-gradient(#CC6E00, #D95409)';

        } else {
          this.displayFirstHeaderButton='none';
          this.displaySecondHeaderButton='none';
        }



        break;
      case 'Finalizada':
        this.statusButtonColor='linear-gradient(#318B35, #297E42)';
        this.secondHeaderButton='Gerar Certificado';
        this.displayTimestamp='none';
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
            console.log("entrou no if do relatorio de conclusão");

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
    this.showSuccessToastr("Atividade salva!");
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
      contestDate:""
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
      contestDate:""
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

}


