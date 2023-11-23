import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Graduacao, Projeto } from 'src/app/shared';
import { Orientador } from 'src/app/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  projetos: Projeto[] = [
    {
      id: 1,
      nome: "Nome do Projeto",
      status: "Aberto",
      tipo: "Extensão",
      curso: new Graduacao(0, "ADS"),
      orientador: new Orientador(0, "Rafaela")
    },
    {
      id: 2,
      nome: "Projeto de Marketing",
      status: "Fechado",
      tipo: "TCC",
      curso: new Graduacao(0, "ADS"),
      orientador: new Orientador(0, "Rafaela")
    },
    {
      id: 3,
      nome: "Relatório de Vendas",
      status: "Fechado",
      tipo: "Mestrado",
      curso: new Graduacao(0, "ADS"),
      orientador: new Orientador(0, "Rafaela")
    },
    {
      id: 4,
      nome: "Treinamento de Equipe",
      status: "Fechado",
      tipo: "Doutorado",
      curso: new Graduacao(0, "ADS"),
      orientador: new Orientador(0, "Rafaela")
    },
    {
      id: 5,
      nome: "Reunião de Equipe",
      status: "Fechado",
      tipo: "Outros",
      curso: new Graduacao(0, "ADS"),
      orientador: new Orientador(0, "Rafaela")
    },
    {
      id: 6,
      nome: "Projeto de Desenvolvimento",
      status: "Aberto",
      tipo: "TCC",
      curso: new Graduacao(0, "ADS"),
      orientador: new Orientador(0, "Rafaela")
    }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Projeto>;
  constructor(private titleService: TitleService, private changeDetectorRef: ChangeDetectorRef) { }

  applyFilter(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    //usar serviço de verificaçãod de role pra apresentar o titulo de acordo com a role
    this.titleService.setTitle('Projetos');
    this.dataSource = new MatTableDataSource<Projeto>(this.projetos);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  hasProjects(): boolean {
    return this.projetos.length > 0;
  }

  buttonOne: string = "Detalhes!";
  tipoLabel: string = "Tipo";//Extenção, tcc,...
  cursoLabel: string = "Curso";
  orientadorLabel: string = "Orientador";
  TitleWarning: string = "Aviso";
  Description: string = "Para cadastrar um novo projeto converse com seu orientador!";
  Button: string = "Saiba mais";

}



