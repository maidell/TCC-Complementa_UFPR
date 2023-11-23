import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeUsuariosComponent } from './cadastro-de-usuarios.component';

describe('CadastroDeUsuariosComponent', () => {
  let component: CadastroDeUsuariosComponent;
  let fixture: ComponentFixture<CadastroDeUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroDeUsuariosComponent]
    });
    fixture = TestBed.createComponent(CadastroDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
