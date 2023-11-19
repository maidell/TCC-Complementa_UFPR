import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../title.service';
import { Servidor } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit, OnDestroy {

  servidores: Servidor[] = [{
    id: 1,
    nome: "João",
    email: "joao@ufpr.br",
    telefone: "123456789",
    senha: "123456",
    papel: "Orientador",
    matricula: "123456"
  },
  {
    id: 2,
    nome: "Maria",
    email: "maria@ufpr.br",
    telefone: "123456789",
    senha: "123456",
    papel: "Orientador",
    matricula: "123456"
  },
  {
    id: 3,
    nome: "José",
    email: "jose@ufpr.br",
    telefone: "123456789",
    senha: "123456",
    papel: "Orientador",
    matricula: "123456"
  }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Servidor>;
  constructor(private titleService: TitleService, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.servidores);
   }

  ngOnInit(): void {
    this.titleService.setTitle('Servidores');
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  hasObject(): boolean {
    return this.servidores.length > 0;
  }
  // id?: number,
  // nome?: string,
  // email?: string,
  // telefone?: string,
  // senha?: string,
  // papel?: string,
  // matricula?: string

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
