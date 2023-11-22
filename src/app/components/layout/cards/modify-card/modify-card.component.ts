import { Component, OnInit } from '@angular/core';
import { ServidoresComponent } from '../../servidores/servidores.component';
import { MatDialog } from '@angular/material/dialog';
import { Competencia, Complexidade } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-modify-card',
  templateUrl: './modify-card.component.html',
  styleUrls: ['./modify-card.component.scss']
})
export class ModifyCardComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }
  title: string = 'Modificar';

  openDialog() {
    this.dialog.open(ServidoresComponent, {
      minWidth: '50%',
    });
  }
  columns: { title: string, key: string }[] = [
    { title: "Competência", key: 'nome' },
    { title: "ID", key: 'id' }
  ];

  dataSource!: MatTableDataSource<Competencia>;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }

  competencias: Competencia[] = [
    { nome: 'Front-end', id: 2304 },
    { nome: 'Back-end', id: 2305 },
    { nome: 'Full-stack', id: 2306 },
    { nome: 'Mobile', id: 2307 },
    { nome: 'DevOps', id: 2308 },
    { nome: 'UX/UI', id: 2309 },
    { nome: 'Data Science', id: 2310 },
    { nome: 'Business Intelligence', id: 2311 },
    { nome: 'Business Analytics', id: 2312 },
    { nome: 'Outros', id: 2313 },
  ]

}


