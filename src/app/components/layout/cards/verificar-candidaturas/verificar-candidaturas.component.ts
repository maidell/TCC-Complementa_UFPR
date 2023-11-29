import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProjetoService } from 'src/app/components/projeto/services/projeto.service';
import { AlunoService } from 'src/app/services/aluno/services/aluno.service';
import { Aluno, Monitor, Projeto } from 'src/app/shared';

@Component({
  selector: 'app-verificar-candidaturas',
  templateUrl: './verificar-candidaturas.component.html',
  styleUrls: ['./verificar-candidaturas.component.scss']
})
export class VerificarCandidaturasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  projeto!: Projeto;
  constructor(public toastr: ToastrService,
    private alunoService: AlunoService,
    private projetoService: ProjetoService,
    @Inject(DIALOG_DATA) public data: any) {
    if (data.projeto) {
      this.projeto = data.projeto;
    }
  }
  ngOnInit(): void {

    this.listaDeAlunosNoProjeto();
    this.displayedColumns = [];
    for (let column of this.columns) {
      this.displayedColumns.push(column.key);
    }
    this.displayedColumns.push('button');
    console.log(this.displayedColumns);
    console.log(this.dataSource);

  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dataSource!: MatTableDataSource<Monitor>;
  buttonOne: string = 'Aprovar';
  buttonTwo: string = 'Recusar';
  colorButtonOne: string = '';
  colorButtonTwo: string = '';

  columns: { title: string, suffix: string, key: string }[] = [

    { title: "Nome", key: 'nome', suffix: 'grr' }
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
  //lista todos os alunos que estão no projeto que a propriedade incluido é true
  monitores: Monitor[] = [];
  listaDeAlunosNoProjeto() {
    if (this.projeto.alunos) {
      this.monitores = this.projeto.alunos;
      this.dataSource = new MatTableDataSource<Monitor>(this.monitores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  removerMonitor(monitor: Monitor) { }
  //muda o aluno para monitor no projeto
  tornarMonitor(monitor: Aluno) {

  }
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



}
