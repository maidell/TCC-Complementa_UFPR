import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/services/login.service';
import { ServidoresComponent } from 'src/app/components/pages';
import { MatDialog } from '@angular/material/dialog';
import { Graduacao, Orientador, Usuario } from 'src/app/shared';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// type UserRole =
export class NavbarComponent {
  exibir: boolean = true;
  userRole: string = ''; // Altere para o perfil do usuário logado:
  // 'ALUNO' | 'SERVIDOR' | 'MONITOR' | 'ORIENTADOR' | 'COORDENADOR' | 'SERVIDOR_COORDENADOR' |'ADMIN';
  graduacao!: Graduacao;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private orientadorService: OrientadorService
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(ServidoresComponent, {
      minWidth: '50%',
      data: {
        idGrad: this.graduacao.id,
        idCoord: this.graduacao.coordenador.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    if (this.loginService.usuarioLogado) {
      this.userRole = this.loginService.usuarioLogado.papel;
      this.exibir = true;
    } else {
      this.loginService.usuarioLogado$.subscribe(usuario => {
        if (usuario) {
          this.userRole = this.loginService.usuarioLogado.papel;
          this.exibir = true;
          this.instanciarGraduacao(usuario);
        }
      });
    }
  }

  instanciarGraduacao(user: Usuario){
    this.orientadorService.buscarOrientadorPorId(user.id).subscribe(
      (res: Orientador) => {
        this.graduacao = res.graduacao;
      },
      (err) => {}
    );
  }

  checkRole(role: string): boolean {
    return this.userRole === role;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(["login"]);
  }
}
