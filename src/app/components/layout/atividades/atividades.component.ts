import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';


@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {
  constructor(private titleService: TitleService) { }
  ngOnInit(): void {
    this.titleService.setTitle('Atividades');
  }

  atividades: string[] = ["aaaa","bbbb","cccc"];

  hasActivities(): boolean {
    return this.atividades.length > 0;
  }

  TitleWarning: string = "Aviso";
  Description: string = "Verificar texto para apresentar de acordo com a role, no figma!";
  Button: string = "Saiba mais";
  Title: string = "Nome da Atividade";
  Subtitle: string = "Em aberto";
  firstLabel: string = "Data de Início";
  firstValue: string = "01/01/2021";
  secondLabel: string = "Data de Término";
  secondValue: string = "01/01/2021";
  thirdLabel: string = "Data de Entrega";
  thirdValue: string = "01/01/2021";
  TitleOne: string = "Projeto de Marketing";
  SubtitleOne: string = "Em andamento";
  firstLabelOne: string = "Data de Início";
  firstValueOne: string = "15/03/2022";
  secondLabelOne: string = "Data de Término";
  secondValueOne: string = "30/06/2022";
  thirdLabelOne: string = "Data de Entrega";
  thirdValueOne: string = "15/07/2022";
  TitleThree: string = "Relatório de Vendas";
  SubtitleThree: string = "Concluído";
  firstLabelThree: string = "Data de Início";
  firstValueThree: string = "01/08/2022";
  secondLabelThree: string = "Data de Término";
  secondValueThree: string = "15/09/2022";
  thirdLabelThree: string = "Data de Entrega";
  thirdValueThree: string = "20/09/2022";
  TitleTwo: string = "Treinamento de Equipe";
  SubtitleTwo: string = "Pendente";
  firstLabelTwo: string = "Data de Início";
  firstValueTwo: string = "10/05/2023";
  secondLabelTwo: string = "Data de Término";
  secondValueTwo: string = "20/06/2023";
  thirdLabelTwo: string = "Data de Entrega";
  thirdValueTwo: string = "30/06/2023";
  TitleFour: string = "Reunião de Equipe";
  SubtitleFour: string = "Agendado";
  firstLabelFour: string = "Data de Início";
  firstValueFour: string = "10/11/2023";
  secondLabelFour: string = "Data de Término";
  secondValueFour: string = "10/11/2023";
  thirdLabelFour: string = "Data de Entrega";
  thirdValueFour: string = "11/11/2023";
  TitleFive: string = "Projeto de Desenvolvimento";
  SubtitleFive: string = "Atrasado";
  firstLabelFive: string = "Data de Início";
  firstValueFive: string = "01/03/2022";
  secondLabelFive: string = "Data de Término";
  secondValueFive: string = "30/12/2022";
  thirdLabelFive: string = "Data de Entrega";
  thirdValueFive: string = "15/01/2023";

}
