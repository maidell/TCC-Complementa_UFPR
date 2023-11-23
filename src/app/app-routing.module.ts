import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocadastroComponent } from './components/pages/autocadastro/autocadastro.component';
import { EditarAlunoComponent } from './components/pages/editar-aluno/editar-aluno.component';
import { LoginRoutes } from './components/auth/auth-routing.module';
import * as pages from './components/pages';
import { ModifyCardComponent } from './components/layout/cards/modify-card/modify-card.component';
import { CadastroDeUsuariosComponent } from './components/pages/cadastro-de-usuarios/cadastro-de-usuarios.component';
import { AtividadeComponent } from './components/atividade/atividade/atividade.component';
import { DashboardComponent } from './components/pages';

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
    path: 'aluno/editar',
    component: DashboardComponent
  },
  {
    path: 'aluno/editar',
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
    path: 'admin/cadastro/usuarios',
    component: CadastroDeUsuariosComponent
  },
  {
    path: 'dashboard',
    component: pages.DashboardComponent
  },
  {
    path: 'projetos/listar',
    component: pages.ProjetosComponent
  },
  {
    path: 'atividades/listar',
    component: pages.AtividadesComponent
  },
  {
    path: 'contestacoes/listar',
    component: pages.ContestacoesComponent
  },
  {
    path: 'graduacoes/listar',
    component: pages.GraduacoesComponent
  },
  {
    path: 'competencias/listar',
    component: pages.CompetenciasComponent
  },
  {
    path: 'complexidades/listar',
    component: pages.ComplexidadesComponent
  },
  {
    path: 'servidores',
    component: pages.ServidoresComponent
  },
  {
    path: 'servidores/listar',
    component: pages.ServidoresComponent
  },
  {
    path: 'meu-perfil',
    component: pages.MeuPerfilComponent
  },
  {
    path: 'teste',
    component: ModifyCardComponent
  },
  {
    path: 'atividade/detalhes',
    component: AtividadeComponent
  },

  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
