import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Complexidade } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-complexidades',
  templateUrl: './complexidades.component.html',
  styleUrls: ['./complexidades.component.scss']
})
export class ComplexidadesComponent implements OnInit{
  button: string = "Detalhes!";
  constructor(private titleService: TitleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Complexidade>(this.complexidades);
  }
  columns: { title: string, suffix?: string, key: string }[] = [
    { title: "Complexidade", key: 'nome' },
    { title: "ID da complexidade", key: 'id' },
    { title: "Carga horária mínima", key: 'cargaHorariaMinima', suffix: 'horas'},
    { title: "Carga horária máxima", key: 'cargaHorariaMaxima', suffix: 'horas' },
  ];

  dataSource!: MatTableDataSource<Complexidade>;
  ngOnInit(): void {
    this.titleService.setTitle('Complexidades');
    this.dataSource = new MatTableDataSource<Complexidade>(this.complexidades);
  }

  // public id!: number;
  // public nome: string = "";
  // public cargaHorariaMinima!: number;
  // public cargaHorariaMaxima!: number;
  complexidades: Complexidade[] = [
    { id: 1, nome: 'Facil', cargaHorariaMinima: 1, cargaHorariaMaxima: 2 },
    { id: 2, nome: 'Media', cargaHorariaMinima: 1, cargaHorariaMaxima: 2 },
    { id: 3, nome: 'Dificil', cargaHorariaMinima: 1, cargaHorariaMaxima: 2 },
    { id: 4, nome: 'Altamente complexa', cargaHorariaMinima: 1, cargaHorariaMaxima: 2 },
    { id: 5, nome: 'Simples', cargaHorariaMinima: 1, cargaHorariaMaxima: 2 },
    { id: 6, nome: 'verificar campo', cargaHorariaMinima: 1, cargaHorariaMaxima: 2 },
  ]

  hasObject(): boolean {
    return this.complexidades.length > 0;
  }
}
