import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarnCardComponent } from './warn-card.component';



describe('WarnCardComponent', () => {
  let component: WarnCardComponent;
  let fixture: ComponentFixture<WarnCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnCardComponent]
    });
    fixture = TestBed.createComponent(WarnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
