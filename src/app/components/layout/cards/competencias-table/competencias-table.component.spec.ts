import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasTableComponent } from './competencias-table.component';

describe('CompetenciasTableComponent', () => {
  let component: CompetenciasTableComponent;
  let fixture: ComponentFixture<CompetenciasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasTableComponent]
    });
    fixture = TestBed.createComponent(CompetenciasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
