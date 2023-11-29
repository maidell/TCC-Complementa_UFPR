import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno, Graduacao, Projeto, Usuario } from 'src/app/shared';
import { LoginService } from '../../auth/services/login.service';
import { ServidorService } from 'src/app/services/servidor/services/servidor.service';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from 'src/app/services/aluno/services/aluno.service';
import { MatSort } from '@angular/material/sort';
import { ProjetoService } from '../../projeto/services/projeto.service';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.scss']
})
export class ListarAlunosComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  projeto!: Projeto;
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    public toastr: ToastrService,
    private alunoService: AlunoService,
    private projetoService: ProjetoService,
    @Inject(DIALOG_DATA) public data: any) {
    if (data.projeto) {
      this.projeto = data.projeto;
    }
  }
  alunos: Aluno[] = [];
  ngOnInit(): void {

    this.listarAlunos();
    this.displayedColumns = [];
    for (let column of this.columns) {
      this.displayedColumns.push(column.key);
    }
    this.displayedColumns.push('button');
    console.log(this.displayedColumns);
    console.log(this.dataSource);
    this.dataSource = new MatTableDataSource<Aluno>(this.alunos);
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dataSource!: MatTableDataSource<Aluno>;
  buttonOne: string = 'Adicionar';
  buttonTwo: string = 'Remover';
  colorButtonOne: string = '';
  colorButtonTwo: string = '';

  columns: { title: string, suffix: string, key: string }[] = [

    { title: "Nome", key: 'nome',suffix: 'grr' }
  ];
  display!: string;
  displayedColumns!: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  listarAlunos() {
    this.alunoService.listarTodosAlunos().subscribe(
      (alunos: Aluno[]) => {
        this.dataSource = new MatTableDataSource<Aluno>(alunos);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ao clicar no botão de adicionar, o aluno é adicionado a lista de alunos do projeto
  adicionarAoProjeto(aluno: Aluno) {
    if (this.projeto.alunos == null) {
      this.projeto.alunos = [];
    }
    aluno.incluido = true;
    this.projeto.alunos.push(aluno);
    this.projetoService.atualizarProjeto(this.projeto).subscribe(
      (projeto: Projeto) => {
        this.projeto = projeto;
        this.toastr.success('Aluno adicionado com sucesso!', 'Sucesso!');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Erro ao adicionar aluno!', 'Erro!');
      }
    );

  }
//usando a flag incluido para verificar se o aluno já está na lista de alunos do projeto
isIncluido(aluno: Aluno) {
    if (this.projeto.alunos == null) {
      this.projeto.alunos = [];
    }
    if (this.projeto.alunos.find(alunoProjeto => alunoProjeto.id === aluno.id)) {
      aluno.incluido = true;
      return true;
    }
    aluno.incluido = false;
    return false;
}

  removerDoProjeto(aluno: Aluno) {
    if (this.projeto.alunos == null) {
      this.projeto.alunos = [];
    }
    aluno.incluido = false;
    this.projeto.alunos = this.projeto.alunos.filter(alunoProjeto => alunoProjeto.id !== aluno.id);
    this.projetoService.atualizarProjeto(this.projeto).subscribe(
      (projeto: Projeto) => {
        this.projeto = projeto;
        this.toastr.info('Aluno removido com sucesso!', 'Sucesso!');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Erro ao remover aluno!', 'Erro!');
      }
    );
  }
}
