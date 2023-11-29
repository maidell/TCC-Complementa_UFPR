import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login, Usuario} from 'src/app/shared';
import { LoginService } from '../services/login.service';
import { AutocadastroComponent } from '../../pages/autocadastro/autocadastro.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ValidaCertificadoComponent } from '../../pages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  @ViewChild('headerComponent') headerComponent!: Component;
  login: Login = new Login();
  emailPattern = '^[a-zA-Z0-9._%+-]+@ufpr.br$';
  loading: boolean = false;
  message!: string;
  leftColumn: number=0;
  rightColumn: number=0;
  brasilBarHeight:number =32;
  fullHeight: number= (window.innerHeight)-this.brasilBarHeight;
  hide: boolean=true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {

    if (this.loginService.usuarioLogado) {
      this.router.navigate([`${this.loginService.usuarioLogado.papel}`]);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.message = params['error'];
    });
    this.handleResize();
  }

  handleResize(){
      if (window.innerWidth<=576){
        this.leftColumn=12;
        this.rightColumn=0;
        this.fullHeight= window.innerHeight;

      } else if (window.innerWidth<=768) {
        this.leftColumn=5;
        this.rightColumn=7;
      } else if (window.innerWidth<=1200) {
        this.leftColumn=4;
        this.rightColumn=8;
      } else {
        this.leftColumn=3;
        this.rightColumn=9;
      }
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.valid) {
      this.loginService.login(this.login).subscribe(
        (response: Usuario) => {
          if (response != null) {
            let usu = response;
            // alert([`${usu.id}\n${usu.nome}\n${usu.email}\n${usu.telefone}\n${usu.papel}`]);
            this.toastr.success("Bem-vindo " + usu.nome + "!");
            this.loginService.usuarioLogado = usu;
            this.loading = false;
            this.router.navigate([`${usu.papel}`.toLowerCase()]);
          } else {
            this.message = 'Usuário/Senha inválidos.';
          }
        });
    }
    this.loading = false;
  }


  openDialog() {
    const dialogRef = this.dialog.open(AutocadastroComponent, {
      width: '60rem',
      height: '40rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogCheck(){
    const dialogRef = this.dialog.open(ValidaCertificadoComponent, {
      width: '40rem',
      height: '10rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
