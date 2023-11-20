import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../components/auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  exibir: boolean = true;
  userRole: string = ''; // Altere para o perfil do usuário logado:
  // 'aluno' | 'coordenadorOrientador' | 'profOrientador' | 'Administrador';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // if (this.loginService.usuarioLogado) {
    //   this.userRole = this.loginService.usuarioLogado.papel;
      this.exibir = true;
    // } else {
    //   this.loginService.usuarioLogado$.subscribe(usuario => {
    //     if (usuario) {
    //       this.userRole = this.loginService.usuarioLogado.papel;
    //       this.exibir = true;
    //     } else {
    //       this.exibir = false;
    //     }
    //   });
    // }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  checkRole(role: string): boolean {
    return this.userRole === role;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(["login"]);
  }
}
