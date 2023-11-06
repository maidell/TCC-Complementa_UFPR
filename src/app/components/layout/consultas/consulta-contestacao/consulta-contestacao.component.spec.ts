import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaContestacaoComponent } from './consulta-contestacao.component';

describe('ConsultaContestacaoComponent', () => {
  let component: ConsultaContestacaoComponent;
  let fixture: ComponentFixture<ConsultaContestacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaContestacaoComponent]
    });
    fixture = TestBed.createComponent(ConsultaContestacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
