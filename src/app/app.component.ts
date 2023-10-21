import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './components/auth/services/login.service';
import { Usuario } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  }

  logout($event: any): void {
    $event.preventDefault();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}