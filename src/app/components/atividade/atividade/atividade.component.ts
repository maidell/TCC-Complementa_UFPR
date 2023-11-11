import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent {

  estado: string ='Aberta'; // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
  
  canEdit=false; // se o usuario que está visualizando pode editar (aluno solicitante, monitor, orientador, etc)
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
  

  activityFormWidth='100%';

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

  editActivity(){
    if (this.canEdit){
      this.editable=true;
    }
  }


}
