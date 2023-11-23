import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule } from './layout/cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { AtividadeModule } from './atividade/atividade.module';
import { OrientadorModule } from '../services/orientador/orientador.module';
import { ServidorModule } from '../services/servidor/servidor.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthModule,
    CardsModule,
    LayoutModule,
    MaterialStylesModule,
    AtividadeModule,
    OrientadorModule,
    ServidorModule
  ],

})
export class ComponentsModule { }
