import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduacoesTableComponent } from './graduacoes-table.component';

describe('GraduacoesTableComponent', () => {
  let component: GraduacoesTableComponent;
  let fixture: ComponentFixture<GraduacoesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraduacoesTableComponent]
    });
    fixture = TestBed.createComponent(GraduacoesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
