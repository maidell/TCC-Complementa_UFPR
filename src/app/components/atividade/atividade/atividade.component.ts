import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent {


  exampleResponse=[
    {
      id: 1,
      nome: "Teste",
      status: "Em Execução", // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
      dataCriacao: "2023-10-27T00:00:00.000-03:00",
      dataLimiteCandidatura: "2023-10-28T00:00:00.000-03:00",
      dataContestacao: null,
      dataConclusao: null,
      competencia: null,
      complexidade: null,
      comentarios: null,
      certificado: null,
      relatorioDeConclusao: null
  }];

  allowedUsers=[
    {id:1},
    {id: 3},
    {id: 4}
  ];



  parsedDate = new Date(this.exampleResponse[0].dataCriacao);
  
  onlineUserId=5;

  estado: string =this.exampleResponse[0].status; 
  

  canApproveContest=true; // pode ou não aprovar a contestação

  editable=false;

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

  data={
    description:"",
    competences:[""],
    complexity:"",
    candidatureLimitDate:"",
    submitLimitDate:"",
    contestDate:""
  };

  complexities=['Simples','Média','Complexa'];


  commentForm!:FormGroup;

  commentValue='';

  activityForm = new FormGroup({
    description: new FormControl,
    competences: new FormControl,
    complexities: new FormControl,
    candidatureDate: new FormControl,
    submitDate: new FormControl,
    contestDate: new FormControl
  });
  datePipe!: DatePipe;

  _snackBar!: MatSnackBar;

  fillingReport=false;

  display: FormControl = new FormControl("");
  file_store!: FileList;
  file_list: Array<string> = [];



  constructor() {}

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

  setHeaderContent(){
    switch (this.estado){
      case 'Nova':  // tela de criação de atividades
        this.statusButtonColor='linear-gradient(#3473a3,#5b7ba5)';

        this.buttonsMarginTop='3%';
        this.firstHeaderButton='Salvar';
        this.firstButtonColor='linear-gradient(#559958, #418856)';
        this.displaySecondHeaderButton='none';
        this.firstButtonWidth='100%';
        
        break;
      case 'Aberta': 
        this.statusButtonColor='linear-gradient(#3473A3, #5B7BA5';

        if(this.allowedUsers.some(user => user.id === this.onlineUserId)){
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
      case 'Em Execução': //visão do solicitante quando o relatorio de conclusão tiver sido preenchido. tratar quando não tiver sido preenchido ainda
        this.statusButtonColor='linear-gradient(#DEB345, #C99614)';

        if(this.allowedUsers.some(user => user.id === this.onlineUserId)){

          if(this.exampleResponse[0].relatorioDeConclusao!=null){
            this.firstHeaderButton='Finalizar';
            this.secondHeaderButton='Contestar';
            this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
            this.secondButtonColor='linear-gradient(#CC6E00,#D95409)';
        
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
        console.log(this.parsedDate);
        this.data={
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
          competences:["Competência 1", "Competência 2", "Competência 3"],
          complexity:"Complexa",
          candidatureLimitDate: '',
          submitLimitDate:"03/12/2023",
          contestDate:""
        }
        this.activityForm.setValue({
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
          competences:["Competência 1", "Competência 2", "Competência 3"],
          complexities:"Média",
          candidatureDate: this.parsedDate,
          submitDate:new Date(Date.UTC(2023,0,11)),
          contestDate:new Date(Date.UTC(2023,0,11)),
        });
        this.displayComments='none';
        this.activityForm.disable();

        break;
      case 'Em Execução':
        this.activityFormWidth='65%';
        this.commentsFormWidth='35%';
        this.displayComments='';
        this.activityForm.setValue({
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
          competences:["Competência 1", "Competência 2", "Competência 3"],
          complexities:"Média",
          candidatureDate:"13/11/2023",
          submitDate:"03/12/2023",
          contestDate:"15/11/2023"
        });
        this.data={
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
          competences:["Competência 1", "Competência 2", "Competência 3"],
          complexity:"Média",
          candidatureLimitDate:"13/11/2023",
          submitLimitDate:"03/12/2023",
          contestDate:"15/11/2023"
        };
        this.activityForm.disable();
        break;
      case 'Carga Horária Contestada':
        break;
      case 'Execução Contestada':
        break;
      case 'Finalizada':
        break;
    }

  }


  firstButtonFunction(){
    console.log("entrou na função do botão");
    console.log(this.fillingReport);
    if (this.estado==="Aberta" && !this.allowedUsers.some(user => user.id === this.onlineUserId)){
      this.openSnackBar("Candidatura Registrada!");
    } else if (this.estado==="Em Execução" && !this.allowedUsers.some(user => user.id === this.onlineUserId)){
      this.fillReport();
    }
    if (this.fillingReport){
      console.log("entrou na função do relatório");
      this.handleSubmit();
    }



  }


  secondButtonFunction(){
    if(!this.editable){
      switch (this.estado){
        case 'Aberta':
          this.editActivity();
          break;

      }
  } else {
      this.editable=false;
      this.isDisabled=true;
      this.setHeaderContent();
  }


  }

  editActivity(){
    if (this.allowedUsers.some(user => user.id === this.onlineUserId)){
      this.editable=true;
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
  parseDate(date: string){
      var dateParts=date.split("/");

      var dateParsed= new FormControl(new Date(+dateParts[2], +dateParts[1]-1, +dateParts[0]));
      return dateParsed;
  }

  @ViewChild('commentPanel') commentPanel!: ElementRef;
  scrollParaUltimoComentario() {
    try {
      const commentPanel = this.commentPanel.nativeElement;
      commentPanel.scrollTop = commentPanel.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  addComment(f: NgForm){
    
    var commentContent: string =f.value.commentInput;
    if(commentContent!= ''){
      var newComment={name:"Teste 1", content:commentContent}
      console.log(newComment.content);
      this.comments.push(newComment);
      this.commentValue='';
    }
  }

  openSnackBar(message: string){
    console.log("entrou na função");
    this._snackBar.open("funcionou");
  }


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
      competences:"",
      complexities:"",
      candidatureDate:"",
      submitDate:"",
      contestDate:""
    });


  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? ` (+${l.length - 1} arquivos)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }
    for (let i = 0; i < this.file_store.length; i++){
      console.log(this.file_store[i]);
      console.log(this.file_store[i].name);
    }
  }
}
