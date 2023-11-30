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
import { ConfirmacaoComponent } from './components/pages/confirmacao/confirmacao.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'autocadastro',
    component: AutocadastroComponent
  },
  {
    path: 'ALUNO',
    redirectTo: 'aluno'
  },
  {
    path: 'aluno',
    children: [
      { path: '', redirectTo: 'aluno/home', pathMatch: 'full' },
      { path: 'home', component: pages.DashboardComponent },
      { path: 'editar/:id', component: EditarUsuariosComponent }
    ]
  },
  {
    path: 'SERVIDOR',
    redirectTo: 'servidor',
    data: { role: ['SERVIDOR'] }
  },
  {
    path: 'servidor',
    children: [
      { path: '', component: pages.ServidoresComponent },
      { path: 'listar/:id', component: pages.ServidoresComponent },
      { path: 'editar/:id', component: EditarUsuariosComponent }
    ]
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
    path: 'ADMIN',
    redirectTo: 'admin'
  },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'admin/home', pathMatch: 'full' },
      { path: 'home', component: pages.DashboardComponent },
      { path: 'cadastro/usuarios', component: CadastroDeUsuariosComponent },
      { path: 'editar/:id', component: EditarUsuariosComponent },
      { path: 'usuarios/listar', component: ListarUsuariosComponent }
    ]
  },
  {
    path: 'dashboard',
    component: pages.DashboardComponent
  },
  {
    path: 'projetos',
    children: [
      { path: 'listar', component: pages.ProjetosComponent },
      { path: 'novo', component: ProjetoComponent },
      { path: 'detalhes/:id', component: ProjetoComponent }
    ]
  },
  {
    path: 'atividades',
    children: [
      { path: 'listar', component: pages.AtividadesComponent },
      { path: 'detalhes', component: AtividadeComponent }
    ]
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
    path: 'teste',
    component: ModifyCardComponent
  },
  {
    path: 'confirmacao/:email',
    component: ConfirmacaoComponent
  },
  
  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
