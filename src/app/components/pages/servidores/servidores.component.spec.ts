import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServidoresComponent } from './servidores.component';

describe('ServidoresComponent', () => {
  let component: ServidoresComponent;
  let fixture: ComponentFixture<ServidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServidoresComponent]
    });
    fixture = TestBed.createComponent(ServidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
