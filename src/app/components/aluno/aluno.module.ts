import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { HomeAlunoComponent } from './home-aluno/home-aluno.component';



@NgModule({
  declarations: [
    AutocadastroComponent,
    EditarAlunoComponent,
    HomeAlunoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AlunoModule { }
