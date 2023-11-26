import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno, Graduacao, Usuario } from 'src/app/shared';
import { LoginService } from '../../auth/services/login.service';
import { ServidorService } from 'src/app/services/servidor/services/servidor.service';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from 'src/app/services/aluno/services/aluno.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.scss']
})
export class ListarAlunosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public toastr: ToastrService, private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.listarAlunos();
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
  dataSource!: MatTableDataSource<Aluno>;
  buttonOne: string = '';
  colorButtonOne: string = '';
  columns: { title: string, suffix?: string, key: string }[] = [
    { title: "Nome", key: 'nome' },
    { title: "Email", key: 'email' }
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },
    (err) => {
      console.log(err);
    }
  );
}

adicionarAoProjeto(aluno: Aluno) {

}
removerDoProjeto(aluno: Aluno) { }
}
