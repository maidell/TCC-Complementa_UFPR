import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasDialogComponent } from './competencias-dialog.component';

describe('CompetenciasDialogComponent', () => {
  let component: CompetenciasDialogComponent;
  let fixture: ComponentFixture<CompetenciasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasDialogComponent]
    });
    fixture = TestBed.createComponent(CompetenciasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
