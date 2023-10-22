import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// type UserRole = 
export class NavbarComponent {
  userRole: string = 'profOrientador'; // Altere para o perfil do usuário logado:
                              // 'aluno' | 'coordenadorOrientador' | 'profOrientador' | 'Administrador';

  checkRole(role: string): boolean {
    return this.userRole === role;
  }
  logout() {
    // Implementar logout
  }
}
