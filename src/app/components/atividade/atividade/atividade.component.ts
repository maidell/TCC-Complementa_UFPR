import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent {

  estado: string ='Aberta'; // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
  
  canEdit=true; // se o usuario que está visualizando pode editar (aluno solicitante, monitor, orientador, etc)
  hasReport=false; // se possui relatorio de conclusão ou não
  canApproveContest=true;

  editable=false;

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

  displaySuffix='';

  activityFormWidth='100%';


  data={
    description:"",
    competences:[""],
    complexity:"",
    candidatureLimitDate:"",
    submitLimitDate:"",
    contestDate:""
  };

  complexities=['Simples','Média','Complexa'];

  constructor(public dialogRef: MatDialogRef<AtividadeComponent>) {}

  
  
  dialogWidth(){
    if (window.innerWidth<=768){
      return "100vw";
    } else  {
      return "80vw";
    } 
  }


  ngOnInit(){
    this.setHeaderContent();
    this.setContent();
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

        if(this.canEdit){
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

        if(this.canEdit){

          if(this.hasReport){
            this.firstHeaderButton='Finalizar';
            this.secondHeaderButton='Contestar';
            this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
            this.secondButtonColor='linear-gradient(#CC6E00,#D95409)';
        
          } else {
            this.displayFirstHeaderButton='none';
            this.displaySecondHeaderButton='none';
          }
        } else {

          if(this.hasReport){
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
      case 'Aberta':
        this.data={
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis semper sem sed semper. Quisque tincidunt ligula et sapien consectetur mattis. Nullam viverra nibh justo, sit amet faucibus sapien bibendum sit amet. Sed non sem aliquet, viverra eros sit amet, tincidunt enim. Vivamus velit dolor, volutpat eget semper et, fermentum nec odio. Curabitur et convallis elit, ut elementum ligula. Vestibulum pretium lorem nisl, in porttitor nibh bibendum laoreet. Morbi feugiat, massa sit amet molestie cursus, mi quam consequat erat, sit amet convallis diam turpis nec quam. Fusce congue, arcu et pharetra mattis, lectus mi mattis augue, sed gravida orci ligula et nulla. Suspendisse pretium ligula ante, et finibus lacus varius eu. Maecenas mollis risus at augue mollis, ac convallis urna vestibulum. Pellentesque at nisl interdum, faucibus leo rhoncus, dapibus mauris. Aliquam eget est vitae nisl finibus tristique. Cras nec nisl posuere, tristique augue sed, accumsan neque. Aliquam mollis dui quis condimentum vulputate. Fusce et nibh id diam tempor egestas a sit amet neque.",
          competences:["Competência 1", "Competência 2", "Competência 3"],
          complexity:"Complexa",
          candidatureLimitDate:"13/11/2023",
          submitLimitDate:"03/12/2023",
          contestDate:""
        }
        this.displaySuffix='none';

        break;
      case 'Em Execução':
        this.activityFormWidth='65%';
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
  onNoClick(): void {
    console.log("entrou na função de fechar");
    this.dialogRef.close();
  }

  editActivity(){
    if (this.canEdit){
      this.editable=true;
      this.isDisabled=false;
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

}
