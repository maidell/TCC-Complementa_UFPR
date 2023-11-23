import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { Aluno, Graduacao } from 'src/app/shared';
import { AlunoService } from '../../../services/aluno/services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.scss']
})
export class AutocadastroComponent implements OnInit {

  @ViewChild('formLogin') formAluno!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  aluno: Aluno = new Aluno();
  senha: string = '';
  confirmarSenha: string = '';
  senhaValida: boolean = false;
  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;
  grrValido: boolean = true;
  myControl = new FormControl();
  options: Graduacao[] = [];
  graduacao!: Graduacao;
  selectedValue: string = '';
  filteredOptions!: Observable<Graduacao[]>;
  hide: boolean=true;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.aluno = new Aluno();
    this.listarCursos();
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }

  private _filter(value: string): Graduacao[] {
    const filterValue = value.toLowerCase();

    if (!this.options) {
      return [];
    }

    return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  autocadastrar(formAluno: NgForm): void {
    if (formAluno.valid) {
      this.aluno.senha = this.senha;
      this.aluno.papel = "ALUNO";
      this.aluno.graduacao = this.graduacao;
      this.alunoService.autocadastrarAluno(this.aluno).subscribe(
        (response) => {
          this.toastr.success(`Um e-mail de confirmação foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          this.toastr.error("Erro ao cadastrar aluno");
          console.error("Erro ao cadastrar aluno:", error);
        }
      );
    }
  }

  listarCursos(): void {
    this.alunoService.listarTodosCursos().subscribe(
      (response) => {
        this.options = response;
      },
      (error) => {
        this.toastr.error("Erro ao listar Cursos:");
        console.error("Erro ao listar Cursos:", error);
      }
    );
  }

  verificarSenha() {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    if (
      senhaRegex.test(this.senha) &&
      this.senha === this.confirmarSenha
    ) {
      this.senhaValida = true;
    } else {
      this.senhaValida = false;
    }
  }

  validarGRR() {
    const regex = /^20\d{6}$/;
    this.grrValido = regex.test(this.aluno.grr);
  }

}
