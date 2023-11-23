import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestacoesComponent } from './contestacoes.component';

describe('ContestacoesComponent', () => {
  let component: ContestacoesComponent;
  let fixture: ComponentFixture<ContestacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestacoesComponent]
    });
    fixture = TestBed.createComponent(ContestacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
