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
  selector: 'app-insert-monitor',
  templateUrl: './insert-monitor.component.html',
  styleUrls: ['./insert-monitor.component.scss']
})
export class InsertMonitorComponent implements OnInit {
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
  buttonOne: string = 'Adicionar';
  buttonTwo: string = 'Remover';
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
  listaDeAlunosNoProjeto(){
    if(this.projeto.alunos){
      this.monitores = this.projeto.alunos;
      this.dataSource = new MatTableDataSource<Monitor>(this.monitores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  removerMonitor(monitor: Monitor) {
    if (this.projeto.alunos == null) {
      this.projeto.alunos = [];
    }
    if (this.projeto.alunos.some(aluno => aluno.id === monitor.id)) {
      console.log('Monitor já está na lista de alunos');
      return;
    }
    if(this.projeto.monitores){
      this.removerAlunoDaLista(this.projeto.monitores, monitor);
    }
    
    monitor.incluido = false;
    this.projeto.alunos.push(monitor);
  
    this.projetoService.atualizarProjeto(this.projeto).subscribe(
      (projeto: Projeto) => {
        this.projeto = projeto;
        this.toastr.success('Monitor removido com sucesso!', 'Sucesso!');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Erro ao remover monitor!', 'Erro!');
      }
    );
  }

  tornarMonitor(monitor: Aluno) {
    if (this.projeto.monitores == null) {
      this.projeto.monitores = [];
    }
    if (this.projeto.monitores.some(aluno => aluno.id === monitor.id)) {
      console.log('Aluno já é monitor');
      return;
    }
    if(this.projeto.alunos){
      this.removerAlunoDaLista(this.projeto.alunos, monitor);
    }
    
    monitor.incluido = true;
    this.projeto.monitores.push(monitor);
  
    this.projetoService.atualizarProjeto(this.projeto).subscribe(
      (projeto: Projeto) => {
        this.projeto = projeto;
        this.toastr.success('Monitor adicionado com sucesso!', 'Sucesso!');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Erro ao adicionar aluno!', 'Erro!');
      }
    );
  }
  
  removerAlunoDaLista(lista: Aluno[], aluno: Aluno) {
    const index = lista.findIndex(a => a.id === aluno.id);
    if (index !== -1) {
      lista.splice(index, 1);
    }
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
