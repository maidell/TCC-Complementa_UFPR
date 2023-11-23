import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectCardComponent } from './rect-card/rect-card.component';
import { SquareCardComponent } from './square-card/square-card.component';
import { MaterialStylesModule } from '../material-styles/material-styles.module';
import { WarnCardComponent } from './warn-card/warn-card.component';
import { ModifyCardComponent } from './modify-card/modify-card.component';
import { TableCardComponent } from './table-card/table-card.component';
import { ComplexidadesTableComponent } from './complexidades-table/complexidades-table.component';
import { ComplexidadesDialogComponent } from './complexidades-dialog/complexidades-dialog.component';
import { ContestacoesTableComponent } from './contestacoes-table/contestacoes-table.component';
import { ContestacoesDialogComponent } from './contestacoes-dialog/contestacoes-dialog.component';
import { CompetenciasTableComponent } from './competencias-table/competencias-table.component';
import { CompetenciasDialogComponent } from './competencias-dialog/competencias-dialog.component';
import { GraduacoesTableComponent } from './graduacoes-table/graduacoes-table.component';
import { GraduacoesDialogComponent } from './graduacoes-dialog/graduacoes-dialog.component';

@NgModule({
  declarations: [
    RectCardComponent,
    SquareCardComponent,
    WarnCardComponent,
    ModifyCardComponent,
    TableCardComponent,
    ComplexidadesTableComponent,
    ComplexidadesDialogComponent,
    ContestacoesTableComponent,
    ContestacoesDialogComponent,
    CompetenciasTableComponent,
    CompetenciasDialogComponent,
    GraduacoesTableComponent,
    GraduacoesDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
  ],
  exports: [
    RectCardComponent,
    SquareCardComponent,
    WarnCardComponent,
    TableCardComponent,
    ComplexidadesTableComponent,
    ComplexidadesDialogComponent,
    ContestacoesTableComponent,
    ContestacoesDialogComponent,
    CompetenciasTableComponent,
    CompetenciasDialogComponent,
    GraduacoesTableComponent,
    GraduacoesDialogComponent
  ]
})
export class CardsModule { }
