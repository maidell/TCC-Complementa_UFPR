import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContestacoesDialogComponent } from '../contestacoes-dialog/contestacoes-dialog.component';
import { Atividade } from 'src/app/shared';

@Component({
  selector: 'app-contestacoes-table',
  templateUrl: './contestacoes-table.component.html',
  styleUrls: ['./contestacoes-table.component.scss']
})
export class ContestacoesTableComponent<T> implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(column => column.key);
    this.displayedColumns.push('button');
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Input() dataSource!: MatTableDataSource<Atividade>;
  @Input() button!: string;
  @Input() colorButtonOne?: string;
  @Input() columns!: { title: string, suffix?: string, key: string }[];
  @Input() display!: string;
  displayedColumns!: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(atividade: Atividade) {
    this.dialog.open(ContestacoesDialogComponent, {
      minWidth: '50%',
      data: { atividade: atividade }
    });
  }
}