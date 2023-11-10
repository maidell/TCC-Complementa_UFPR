import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCompetenciasComponent } from './consulta-competencias.component';

describe('ConsultaCompetenciasComponent', () => {
  let component: ConsultaCompetenciasComponent;
  let fixture: ComponentFixture<ConsultaCompetenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaCompetenciasComponent]
    });
    fixture = TestBed.createComponent(ConsultaCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
