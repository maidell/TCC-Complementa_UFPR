import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestacoesTableComponent } from './contestacoes-table.component';

describe('ContestacoesTableComponent', () => {
  let component: ContestacoesTableComponent;
  let fixture: ComponentFixture<ContestacoesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestacoesTableComponent]
    });
    fixture = TestBed.createComponent(ContestacoesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
