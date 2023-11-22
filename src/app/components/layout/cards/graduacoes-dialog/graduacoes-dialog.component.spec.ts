import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduacoesDialogComponent } from './graduacoes-dialog.component';

describe('GraduacoesDialogComponent', () => {
  let component: GraduacoesDialogComponent;
  let fixture: ComponentFixture<GraduacoesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraduacoesDialogComponent]
    });
    fixture = TestBed.createComponent(GraduacoesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
