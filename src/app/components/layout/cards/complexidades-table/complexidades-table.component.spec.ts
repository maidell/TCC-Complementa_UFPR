import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexidadesTableComponent } from './complexidades-table.component';

describe('ComplexidadesTableComponent', () => {
  let component: ComplexidadesTableComponent;
  let fixture: ComponentFixture<ComplexidadesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplexidadesTableComponent]
    });
    fixture = TestBed.createComponent(ComplexidadesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
