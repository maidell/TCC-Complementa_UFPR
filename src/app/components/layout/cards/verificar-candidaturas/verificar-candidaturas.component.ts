import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AtividadeService } from 'src/app/components/atividade/services/atividade.service';
import { ProjetoService } from 'src/app/components/projeto/services/projeto.service';
import { AlunoService } from 'src/app/services/aluno/services/aluno.service';
import { Aluno, Atividade, Monitor, Projeto } from 'src/app/shared';

@Component({
  selector: 'app-verificar-candidaturas',
  templateUrl: './verificar-candidaturas.component.html',
  styleUrls: ['./verificar-candidaturas.component.scss']
})
export class VerificarCandidaturasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() usuarioAprovado = new EventEmitter<Aluno>();
  @Output() usuarioRemovido = new EventEmitter<Aluno>();

  candidatos: Aluno[] = [];
  constructor(public toastr: ToastrService,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialogRef<VerificarCandidaturasComponent>,
    @Inject(DIALOG_DATA) public data: any) {
    if (data) {
      this.candidatos = data;
    }
  }
  obs!: Aluno[];
  dataSource!: MatTableDataSource<Aluno>;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Aluno>(this.candidatos);

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


  buttonOne: string = 'Aprovar';
  buttonTwo: string = 'Recusar';
  colorButtonOne: string = 'colorButtonOne';
  colorButtonTwo: string = 'colorButtonTwo';

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

  aprovar(candidato: Aluno){
    this.usuarioAprovado.emit(candidato);
    this.onNoClick();
  }

  recusar(candidato: Aluno){
    this.usuarioRemovido.emit(candidato);
    let index = this.candidatos.indexOf(candidato);
    this.candidatos.splice(index,1);
    this.changeDetectorRef.detectChanges();
  }

  onNoClick(): void {
    this.dialog.close();
  }


}
