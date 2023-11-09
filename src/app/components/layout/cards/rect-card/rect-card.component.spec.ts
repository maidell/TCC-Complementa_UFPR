import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectCardComponent } from './rect-card.component';

describe('RectCardComponent', () => {
  let component: RectCardComponent;
  let fixture: ComponentFixture<RectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectCardComponent]
    });
    fixture = TestBed.createComponent(RectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
