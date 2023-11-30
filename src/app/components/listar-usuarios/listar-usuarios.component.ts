import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/services/usuario.service';
import { Usuario } from 'src/app/shared';
import { LoginService } from '../auth/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
//componente de listagem de todos usuarios cadastrados, com um botão de adicionar novo usuario
export class ListarUsuariosComponent implements OnInit {
  inputValue: string = '';
  usuarioLogado: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  buttonOne: string = "Detalhes!";



  constructor(
    private title: TitleService,
    private userService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
    public loginService: LoginService
  ) { }
  ngOnInit(): void {
    this.title.setTitle('Listar Usuários');
    this.usuarioLogado = this.loginService.usuarioLogado
    if (!this.usuarioLogado) {
      this.router.navigate(['login']);
    } else {
      this.instanciarUsuarios();
    }

  }
  @ViewChild('table') table: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Usuario>;
  obs!: Observable<Usuario[]>;
  instanciarUsuarios() {
    this.userService.listarTodosUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
        this.obs = this.dataSource.connect();
        this.toastr.success('Usuários listados com sucesso!');
      },
      (error) => {
        this.toastr.error('Erro ao listar usuários!');
      }
    );
    if (this.table) {
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
      this.obs = this.dataSource.connect();
    }
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  applyFilter(event: Event) {
    if (this.dataSource) {
      this.inputValue = (event.target as HTMLInputElement).value;
      const filterValue = this.inputValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  openDialog(usuario: Usuario) {
    this.router.navigate([`admin/editar/${usuario.id}`]);
  }
}
