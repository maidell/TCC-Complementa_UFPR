import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Aluno, Graduacao } from 'src/app/shared';
import { AlunoService } from '../services/aluno.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';




@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.scss']
})
export class AutocadastroComponent implements OnInit {

  @ViewChild('formAluno', { read: MatAutocompleteTrigger}) formAluno!: NgForm;

  aluno!: Aluno;
  
  senha: string = '';
  confirmarSenha: string = '';
  senhaValida: boolean = false;
  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;
  grrValido: boolean = true;
  myControl = new FormControl();
  options: string[]=[
    'Administração','Agronomia','Arquitetura e Urbanismo','Artes Visuais','Biomedicina','Ciências Biológicas','Ciências Contábeis','Ciências da Computação',
    'Ciências Econômicas','Ciências Sociais','Design de Produto','Design Gráfico','Direito','Educação Física','Enfermagem','Engenharia Ambiental','Engenharia Cartográfica e de Agrimensura',
    'Engenharia Civil','Engenharia de Bioprocessos e Biotecnologia','Engenharia de Produção','Engenharia Elétrica','Engenharia Florestal','Engenharia Industrial Madereira',
    'Engenharia Mecânica','Engenharia Química','Estatística','Expressão Gráfica','Fármacia','Filosofia','Física','Fisioterapia','Geografia','Geologia','Gestão da Informação',
    'História','História Memória e Imagem','Informática Biomédica','Jornalismo','Letras','Letras Libras','Matemática','Matemática Industrial','Medicina','Medicina Veterinária',
    'Música','Nutrição','Odontologia','Pedagogia','Psicologia','Publicidade e Propaganda','Química','Relações Públicas','Tecnologia em Análise e Desenvolvimento de Sistemas',
    'Tecnologia em Comunicação Institucional','Tecnologia em Gestão da Qualidade','Tecnologia em Gestão Pública','Tecnologia em Luteria','Tecnologia em Negócios Imobiliários',
    'Tecnologia em Produção Cênica','Tecnologia em Secretariado','Terapia Ocupacional','Turismo','Zootecnia'
  ];
  selectedValue: string = '';
  filteredOptions!: Observable<string[]>;



  constructor(
    private router: Router,
    private alunoService: AlunoService,
    public dialog: MatDialog
  ) {
  }  

  ngOnInit(): void {
    this.aluno = new Aluno();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  autocadastrar(): void {
    if (this.formAluno.form.valid) {
      this.aluno.senha = this.senha;
      this.aluno.papel = "aluno";
      this.alunoService.autocadastrarAluno(this.aluno).subscribe(
        (response) => {
          alert(`Um e-mail de confirmação foi enviado para ${response.email}`);
          this.router.navigate([""]);
        },
        (error) => {
          console.error("Erro ao cadastrar aluno:", error);
        }
      );
    }
  }

  verificarSenha() {
    // Verificar se a senha atende às condições específicas
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
