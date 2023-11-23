import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { ContestacoesComponent } from './contestacoes/contestacoes.component';
import { GraduacoesComponent } from './graduacoes/graduacoes.component';
import { ComplexidadesComponent } from './complexidades/complexidades.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import { MaterialStylesModule } from '../layout/material-styles/material-styles.module';
import { CardsModule } from '../layout/cards/cards.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { IConfig } from 'ngx-mask';
import { AutocadastroComponent } from '../pages/autocadastro/autocadastro.component';
import { EditarAlunoComponent } from '../pages/editar-aluno/editar-aluno.component';
import { CadastroDeUsuariosComponent } from './cadastro-de-usuarios/cadastro-de-usuarios.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    DashboardComponent,
    ProjetosComponent,
    AtividadesComponent,
    ContestacoesComponent,
    GraduacoesComponent,
    ComplexidadesComponent,
    ServidoresComponent,
    MeuPerfilComponent,
    CompetenciasComponent,
    AutocadastroComponent,
    EditarAlunoComponent,
    CadastroDeUsuariosComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    LayoutModule,
    FormsModule,
    RouterModule,
    CardsModule
  ],
  exports: [
    DashboardComponent,
    ProjetosComponent,
    AtividadesComponent,
    ContestacoesComponent,
    GraduacoesComponent,
    ComplexidadesComponent,
    ServidoresComponent,
    MeuPerfilComponent,
    CompetenciasComponent,
    AutocadastroComponent,
    EditarAlunoComponent,
    CadastroDeUsuariosComponent
  ]
})
export class PagesModule { }
