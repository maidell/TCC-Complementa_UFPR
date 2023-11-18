import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexidadesComponent } from './complexidades.component';

describe('ComplexidadesComponent', () => {
  let component: ComplexidadesComponent;
  let fixture: ComponentFixture<ComplexidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplexidadesComponent]
    });
    fixture = TestBed.createComponent(ComplexidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
