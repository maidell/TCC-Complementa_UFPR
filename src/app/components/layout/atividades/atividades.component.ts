import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../title.service';
import { Atividade } from 'src/app/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit, OnDestroy {

  atividades: Atividade[] = [

    {
      id: 1,
      nome: "Nome da Atividade",
      status: "Em aberto",
      dataCriacao: new Date("2021-11-12"),
      dataLimiteCandidatura: new Date("2021-01-01"),
      dataConclusao: new Date("2021-01-01"),
    },
    {
      id: 2,
      nome: "Projeto de Marketing",
      status: "Em andamento",
      dataCriacao: new Date("2022-03-13"),
      dataLimiteCandidatura: new Date("2022-06-30"),
      dataConclusao: new Date("2022-07-15")
    },
    {
      id: 3,
      nome: "Relatório de Vendas",
      status: "Concluído",
      dataCriacao: new Date("2022-08-01"),
      dataLimiteCandidatura: new Date("2022-09-15"),
      dataConclusao: new Date("2022-09-20")
    },
    {
      id: 4,
      nome: "Treinamento de Equipe",
      status: "Pendente",
      dataCriacao: new Date("2023-05-10"),
      dataLimiteCandidatura: new Date("2023-06-20"),
      dataConclusao: new Date("2023-06-30")
    },
    {
      id: 5,
      nome: "Reunião de Equipe",
      status: "Agendado",
      dataCriacao: new Date("2023-11-10"),
      dataLimiteCandidatura: new Date("2023-11-10"),
      dataConclusao: new Date("2023-11-11")
    },
    {
      id: 6,
      nome: "Projeto de Desenvolvimento",
      status: "Atrasado",
      dataCriacao: new Date("2022-03-01"),
      dataLimiteCandidatura: new Date("2022-12-30"),
      dataConclusao: new Date("2023-01-15")
    }];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Atividade>;
  constructor(private titleService: TitleService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.titleService.setTitle('Atividades');
    this.dataSource = new MatTableDataSource<Atividade>(this.atividades);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hasActivities(): boolean {
    return this.atividades.length > 0;
  }

  nameButtonRect:string = "Detalhes!";
  dataCriacaoLabel: string = "Data de Criação";
  dataLimiteCandidaturaLabel: string = "Data de Limite para Candidatura";
  dataConclusaoLabel: string = "Data de Conclusão";
  dataContestacaoLabel: string = "Data de Contestação";

  TitleWarning: string = "Aviso";
  Description: string = "Verificar texto para apresentar de acordo com a role, no figma!";
  Button: string = "Saiba mais";






}
