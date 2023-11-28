import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GraduacoesDialogComponent } from '../graduacoes-dialog/graduacoes-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Graduacao } from 'src/app/shared';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { OrientadorService } from 'src/app/services/orientador/services/orientador.service';

@Component({
  selector: 'app-graduacoes-table',
  templateUrl: './graduacoes-table.component.html',
  styleUrls: ['./graduacoes-table.component.scss']
})
export class GraduacoesTableComponent<T> implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    public graduacaoService: GraduacaoService,
    public orientadorService: OrientadorService
    ) { }
  buttonNew: string = "Nova Graduação";
  ngOnInit(): void {
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
  @Input() dataSource!: MatTableDataSource<T>;
  @Input() button!: string;
  @Input() colorButtonOne?: string;
  @Input() columns!: {title: string, suffix?: string, key: string}[];
  @Input() display!: string;
  displayedColumns!: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  adicionarGraduacao() {
    this.openDialog(new Graduacao());
  }

  openDialog(graduacao: Graduacao) {
    console.log("Parametro OD:", graduacao.id);
    if (graduacao.id) {
      this.graduacaoService.buscarGraduacaoPorId(graduacao.id).subscribe(
        (res: Graduacao) => {
          console.log("Res instanciado:", res);
          const dialogRef = this.dialog.open(GraduacoesDialogComponent, {
            minWidth: '40rem',
            data: res
          });
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
          });
        }
      );
    }
  }

}