import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarCandidaturasComponent } from './verificar-candidaturas.component';

describe('VerificarCandidaturasComponent', () => {
  let component: VerificarCandidaturasComponent;
  let fixture: ComponentFixture<VerificarCandidaturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarCandidaturasComponent]
    });
    fixture = TestBed.createComponent(VerificarCandidaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
