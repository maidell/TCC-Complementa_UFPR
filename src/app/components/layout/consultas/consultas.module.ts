import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaAtividadeComponent } from './consulta-atividade/consulta-atividade.component';
import { ConsultaContestacaoComponent } from './consulta-contestacao/consulta-contestacao.component';
import { ConsultaProjetoComponent } from './consulta-projeto/consulta-projeto.component';
import { ConsultaComplexidadesComponent } from './consulta-complexidades/consulta-complexidades.component';
import { ConsultaCompetenciasComponent } from './consulta-competencias/consulta-competencias.component';
import { ConsultaCursosComponent } from './consulta-cursos/consulta-cursos.component';

@NgModule({
  declarations: [
    ConsultaAtividadeComponent,
    ConsultaContestacaoComponent,
    ConsultaProjetoComponent,
    ConsultaComplexidadesComponent,
    ConsultaCompetenciasComponent,
    ConsultaCursosComponent
  ],
  imports: [
    CommonModule
  ],
  exports:
  [
      ConsultaAtividadeComponent,
      ConsultaContestacaoComponent,
      ConsultaProjetoComponent,
      ConsultaComplexidadesComponent,
      ConsultaCompetenciasComponent,
      ConsultaCursosComponent
  ]
})
export class ConsultasModule { }
