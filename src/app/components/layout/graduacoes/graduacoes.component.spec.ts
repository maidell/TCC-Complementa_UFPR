import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduacoesComponent } from './graduacoes.component';

describe('GraduacoesComponent', () => {
  let component: GraduacoesComponent;
  let fixture: ComponentFixture<GraduacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraduacoesComponent]
    });
    fixture = TestBed.createComponent(GraduacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
