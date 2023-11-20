import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TitleService } from '../../title.service';
import { Servidor } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss'],

})
export class ServidoresComponent implements OnInit, OnDestroy {
  inputValue: string = '';

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
  constructor(@Inject(DIALOG_DATA) public data: Servidor, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.servidores);
   }

  ngOnInit(): void {
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

  applyFilter(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
