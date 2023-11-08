import { Component } from '@angular/core';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent {
  estado: string ='Finalizada'; // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
  statusButtonColor='';

  firstButtonColor='';
  firstHeaderButton = '';
  
  secondButtonColor='';
  secondHeaderButton = '';

  thirdButtonColor='';
  thirdHeaderButton = '';

  newActivityDisplay = '';
  

  ngOnInit(){
    this.setHeaderButtons();
  }

  setHeaderButtons(){
    switch (this.estado){
      case 'Nova':  // tela de criação de atividades
        this.secondHeaderButton='Salvar';
        this.thirdHeaderButton='Cancelar';
        this.newActivityDisplay='none';
        this.statusButtonColor='linear-gradient(#3473a3,#5b7ba5)';
        this.secondButtonColor='linear-gradient(#559958, #418856)';
        this.thirdButtonColor='linear-gradient(#C7433F, #C7241F)';
        break;
      case 'Aberta':  // para aluno solicitante. Tratar possibilidades pro aluno executor
        this.firstHeaderButton='Visualizar Candidaturas';
        this.secondHeaderButton='Editar';
        this.thirdHeaderButton='Fechar';
        this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
        this.secondButtonColor='linear-gradient(#CC6E00,#D95409)';
        this.thirdButtonColor='linear-gradient(#C7433F, #C7241F)';
        break;
      case 'Em Execução': //visão do solicitante quando o relatorio de conclusão tiver sido preenchido. tratar quando não tiver sido preenchido ainda
        this.firstHeaderButton='Finalizar';
        this.secondHeaderButton='Contestar';
        this.thirdHeaderButton='Fechar';
        this.firstButtonColor='linear-gradient(#2494D3,#0076D0)';
        this.secondButtonColor='linear-gradient(#CC6E00,#D95409)';
        this.thirdButtonColor='linear-gradient(#C7433F, #C7241F)';
        break;
      case 'Carga Horária Contestada':
        
        break;
      case 'Execução Contestada':

        break;
      case 'Finalizada':
        this.secondHeaderButton='Gerar Certificado';
        this.thirdHeaderButton='Fechar';
        this.newActivityDisplay='none';
        this.statusButtonColor='linear-gradient(#318B35, #297E42)';
        this.secondButtonColor='linear-gradient(#559958, #418856)';
        this.thirdButtonColor='linear-gradient(#C7433F, #C7241F)';
        break;
    }
  }


}
