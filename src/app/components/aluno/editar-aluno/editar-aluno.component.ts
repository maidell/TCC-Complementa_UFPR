import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Aluno, Graduacao, senhaValidator } from 'src/app/shared';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.scss']
})
export class EditarAlunoComponent {

  aluno!: Aluno;

  formAluno!: FormGroup;
  senha: string = '';
  confirmarSenha: string = '';
  senhaValida: boolean = false;
  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;
  grrValido: boolean = true;
  myControl = new FormControl();
  options!: Graduacao[];
  selectedValue: string = '';
  filteredOptions!: Observable<Graduacao[]>;
  hide: boolean=true;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
  ) {
    this.formAluno = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9._%+-]+@ufpr\.br$')]),
      curso: new FormControl('', Validators.required),
      grr: new FormControl(''),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8), senhaValidator]),
      confirmarSenha: new FormControl('', Validators.required),
    }, { validators: this.verificarSenha.bind(this) });
  }  

  ngOnInit(): void {
    this.aluno = new Aluno();
    this.listarCursos();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Graduacao[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  autocadastrar(): void {
    if (this.formAluno.valid) {
      this.aluno.senha = this.senha;
      this.aluno.papel = "aluno";
      this.alunoService.autocadastrarAluno(this.aluno).subscribe(
        (response: any) => {
          alert(`Um e-mail de confirmação foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
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
        console.error("Erro ao listar Cursos:", error);
      }
    );
  }

  verificarSenha(control: AbstractControl): ValidationErrors | null {
    const senhaControl = control.get('senha');
    const confirmarSenhaControl = control.get('confirmarSenha');
  
    if (!senhaControl || !confirmarSenhaControl) {
      return { senhasNaoIguais: true }
    }
  
    const senha = senhaControl.value;
    const confirmarSenha = confirmarSenhaControl.value;
  
    return senha === confirmarSenha ? null : { senhasNaoIguais: true };
  }

  validarGRR() {
    const regex = /^20\d{6}$/;
    this.grrValido = regex.test(this.aluno.grr);
  }

  displayFn(graduacao: Graduacao): string {
    return graduacao && graduacao.nome ? graduacao.nome : '';
}

}
