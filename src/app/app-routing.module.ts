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
import { ProjetoComponent } from './components/projeto/projeto.component';
import { ListarAlunosComponent } from './components/layout/listar-alunos/listar-alunos.component';
import { EditarUsuariosComponent } from './components/pages/editar-usuarios/editar-usuarios.component';

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
    path: 'aluno',
    component: DashboardComponent
  },
  {
    path: 'aluno/editar/:id',
    component: EditarUsuariosComponent
  },
  {
    path: 'servidor/editar/:id',
    component: EditarUsuariosComponent
  },
  {
    path: 'coordenador/editar/:id',
    component: EditarUsuariosComponent
  },
  {
    path: 'orientador/editar/:id',
    component: EditarUsuariosComponent
  },
  {
    path: 'admin/editar/:id',
    component: EditarUsuariosComponent
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
    path: 'admin/editar/:id',
    component: EditarUsuariosComponent
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
  {
    path: 'projetos/novo',
    component: ProjetoComponent
  },
  {
    path: 'projetos/detalhes/:id',
    component: ProjetoComponent
  },

  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
