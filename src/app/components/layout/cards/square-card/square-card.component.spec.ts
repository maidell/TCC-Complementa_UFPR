import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareCardComponent } from './square-card.component';

describe('SquareCardComponent', () => {
  let component: SquareCardComponent;
  let fixture: ComponentFixture<SquareCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SquareCardComponent]
    });
    fixture = TestBed.createComponent(SquareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
