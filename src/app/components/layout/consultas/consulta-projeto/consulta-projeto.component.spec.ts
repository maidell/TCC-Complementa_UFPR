import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProjetoComponent } from './consulta-projeto.component';

describe('ConsultaProjetoComponent', () => {
  let component: ConsultaProjetoComponent;
  let fixture: ComponentFixture<ConsultaProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaProjetoComponent]
    });
    fixture = TestBed.createComponent(ConsultaProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
