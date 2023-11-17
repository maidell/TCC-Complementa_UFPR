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
    path: 'projetos',
    component: ProjetosComponent
  },
  {
    path: 'atividades',
    component: AtividadesComponent
  },
  {
    path: 'contestacoes',
    component: ContestacoesComponent
  },
  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
