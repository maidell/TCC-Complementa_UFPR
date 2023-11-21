import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestacoesDialogComponent } from './contestacoes-dialog.component';

describe('ContestacoesDialogComponent', () => {
  let component: ContestacoesDialogComponent;
  let fixture: ComponentFixture<ContestacoesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestacoesDialogComponent]
    });
    fixture = TestBed.createComponent(ContestacoesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
