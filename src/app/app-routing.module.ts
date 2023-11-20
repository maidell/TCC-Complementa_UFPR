import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAlunoComponent } from './components/aluno/home-aluno/home-aluno.component';
import { AutocadastroComponent } from './components/aluno/autocadastro/autocadastro.component';
import { HomeUsuarioComponent } from './components/usuario/home-usuario/home-usuario.component';
import { EditarAlunoComponent } from './components/aluno/editar-aluno/editar-aluno.component';
import { LoginRoutes } from './components/auth/auth-routing.module';
import { DashAdminComponent } from './components/admin/dash-admin/dash-admin.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { ProjetosComponent } from './components/layout/projetos/projetos.component';
import { AtividadesComponent } from './components/layout/atividades/atividades.component';
import { ContestacoesComponent } from './components/layout/contestacoes/contestacoes.component';
import { GraduacoesComponent } from './components/layout/graduacoes/graduacoes.component';
import { Competencia, Complexidade } from './shared';
import { ComplexidadesComponent } from './components/layout/complexidades/complexidades.component';
import { ServidoresComponent } from './components/layout/servidores/servidores.component';
import { MeuPerfilComponent } from './components/layout/meu-perfil/meu-perfil.component';
import { CompetenciasComponent } from './components/layout/competencias/competencias.component';
import { ModifyCardComponent } from './components/layout/cards/modify-card/modify-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'aluno',
    redirectTo: 'aluno/home'
  },
  {
    path: 'aluno/home',
    component: HomeAlunoComponent
  },
  {
    path: 'aluno/editar', //removi o :id
    component: EditarAlunoComponent
  },
  {
    path: 'autocadastro',
    component: AutocadastroComponent
  },
  {
    path: 'ADMIN',
    redirectTo: 'admin/home'
  },
  {
    path: 'admin',
    redirectTo: 'admin/home'
  },
  {
    path: 'admin/home',
    component: HomeUsuarioComponent
  },
  {
    path: 'dash-admin', component: DashAdminComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projetos/listar',
    component: ProjetosComponent
  },
  {
    path: 'atividades/listar',
    component: AtividadesComponent
  },
  {
    path: 'contestacoes/listar',
    component: ContestacoesComponent
  },
  {
    path: 'graduacoes/listar',
    component: GraduacoesComponent
  },
  {
    path: 'competencias/listar',
    component: CompetenciasComponent
  },
  {
    path: 'complexidades/listar',
    component: ComplexidadesComponent
  },
  {
    path: 'servidores/listar',
    component: ServidoresComponent
  },
  {
    path: 'meu-perfil',
    component: MeuPerfilComponent
  },
  {
    path: 'teste',
    component: ModifyCardComponent
  },


  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
