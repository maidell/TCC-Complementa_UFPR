import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// type UserRole =
export class NavbarComponent {
  exibir: boolean = false;
  userRole: string = ''; // Altere para o perfil do usuário logado:
  // 'aluno' | 'coordenadorOrientador' | 'profOrientador' | 'Administrador';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    /**if (this.loginService.usuarioLogado) {
      this.userRole = this.loginService.usuarioLogado.papel;*/
      this.exibir = true;
   /** } else {
      this.loginService.usuarioLogado$.subscribe(usuario => {
        if (usuario) {
          this.userRole = this.loginService.usuarioLogado.papel;
          this.exibir = true;
        }
      });
    }*/
  }


  checkRole(role: string): boolean {
    return this.userRole === role;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(["login"]);
  }
}
