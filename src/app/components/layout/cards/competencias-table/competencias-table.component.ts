import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompetenciasDialogComponent } from '../competencias-dialog/competencias-dialog.component';
import { Competencia, Graduacao } from 'src/app/shared';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';

@Component({
  selector: 'app-competencias-table',
  templateUrl: './competencias-table.component.html',
  styleUrls: ['./competencias-table.component.scss']
})
export class CompetenciasTableComponent<T> implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  buttonNew: string = "Nova Competência";

  constructor(public dialog: MatDialog,
    public graduacaoService: GraduacaoService
  ) { }

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
  @Input() columns!: { title: string, suffix?: string, key: string }[];
  @Input() display!: string;
  @Input() graduacao!: Graduacao;
  displayedColumns!: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  adicionarCompetencia() {
    this.openDialog(new Competencia);
  }

  openDialog(competencia: Competencia) {
    const dialogRef = this.dialog.open(CompetenciasDialogComponent, {
      minWidth: '40rem',
      data: {
        competencia: competencia,
        graduacao: this.graduacao
      }
    });
  }




}