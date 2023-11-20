import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { MatDialog } from '@angular/material/dialog';
import { Competencia } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent implements OnInit {
  button: string = "Detalhes!";
  constructor(private titleService: TitleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Competencia>(this.competencias);
  }
  columns: { title: string, key: string }[] = [
    { title: "Competência", key: 'nome' }
  ];

  dataSource!: MatTableDataSource<Competencia>;
  ngOnInit(): void {
    this.titleService.setTitle('Competencias');
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

  hasObjects(): boolean {
    return this.competencias.length > 0;
  }

}
