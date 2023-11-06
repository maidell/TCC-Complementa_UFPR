import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaComplexidadesComponent } from './consulta-complexidades.component';

describe('ConsultaComplexidadesComponent', () => {
  let component: ConsultaComplexidadesComponent;
  let fixture: ComponentFixture<ConsultaComplexidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaComplexidadesComponent]
    });
    fixture = TestBed.createComponent(ConsultaComplexidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
