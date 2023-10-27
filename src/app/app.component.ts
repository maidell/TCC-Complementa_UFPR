import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './components/auth/services/login.service';
import { Usuario } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  usuarioLogado: boolean=true;


  handleSize(): {opened: string, mode: any} {
      if (window.innerWidth<=1024) {
        console.log(window.innerWidth);
        return {opened: "false", mode: "over"}
      } else {
        return {opened: "true", mode: "side"}
      }
  }





  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  /**get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  }*/

  logout($event: any): void {
    $event.preventDefault();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}