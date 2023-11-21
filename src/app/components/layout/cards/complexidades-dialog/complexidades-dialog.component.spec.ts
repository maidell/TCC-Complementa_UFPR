import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexidadesDialogComponent } from './complexidades-dialog.component';

describe('ComplexidadesDialogComponent', () => {
  let component: ComplexidadesDialogComponent;
  let fixture: ComponentFixture<ComplexidadesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplexidadesDialogComponent]
    });
    fixture = TestBed.createComponent(ComplexidadesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
