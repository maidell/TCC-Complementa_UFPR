import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { HomeAlunoComponent } from './home-aluno/home-aluno.component';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AutocadastroComponent,
    EditarAlunoComponent,
    HomeAlunoComponent,

  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    LayoutModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class AlunoModule { }
