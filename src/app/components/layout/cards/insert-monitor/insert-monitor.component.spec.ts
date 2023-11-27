import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMonitorComponent } from './insert-monitor.component';

describe('InsertMonitorComponent', () => {
  let component: InsertMonitorComponent;
  let fixture: ComponentFixture<InsertMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertMonitorComponent]
    });
    fixture = TestBed.createComponent(InsertMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
