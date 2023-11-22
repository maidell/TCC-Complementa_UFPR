import { Component } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  exibir: boolean = true;
  userName = "";
  grr = "";
  name = this.userName.split(/[, ]+/);
  displayName = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
   if (this.loginService.usuarioLogado) {
      this.exibir = true;
      this.userName = this.loginService.usuarioLogado.nome;
      this.grr = this.loginService.usuarioLogado.papel;
      this.printName();
    } else {
      this.loginService.usuarioLogado$.subscribe(usuario => {
        if (usuario) {
          this.exibir = true;
          this.userName = this.loginService.usuarioLogado.nome;
          this.grr = this.loginService.usuarioLogado.papel;
          this.printName();
        } else {
          this.exibir = false;
        }
      });
    }
  }

  printName() {
    if (this.name.length === 2) {
      this.displayName = `${this.name[0]} ${this.name[1]}`;
    } else {
      this.displayName = `${this.name[0]} ${this.name[(this.name.length - 1)]}`;
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["login"]);
  }


}
