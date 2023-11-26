import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { Atividade } from 'src/app/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AtividadeService } from '../../atividade/services/atividade.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../auth/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AtividadeComponent } from '../../atividade/atividade/atividade.component';


@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit, OnDestroy {

  inputValue: string = '';
  atividades: Atividade[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Atividade>;
  constructor(
    private titleService: TitleService,
    private changeDetectorRef: ChangeDetectorRef,
    public atividadeService: AtividadeService,
    public router: Router,
    public toastr: ToastrService,
    public loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.instanciarAtividades().subscribe(
      (response: Atividade[]) => {
        this.atividades = response;
        this.toastr.success("Atividades recebidas com sucesso!")
        console.log("Atividades recebidas com sucesso!", this.atividades);
        this.titleService.setTitle('Atividades');
        this.dataSource = new MatTableDataSource<Atividade>(this.atividades);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      },
      (error: any) => {
        this.toastr.error("Erro ao listar atividades")
        console.log("Erro ao listar atividades", error);
      }
    );
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  applyFilter(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.replace(/\s+/g, ' ').trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  hasActivities(): boolean {
    return this.atividades.length > 0;
  }

  buttonOne: string = "Detalhes!";
  dataCriacaoLabel: string = "Data de Criação";
  dataLimiteCandidaturaLabel: string = "Data de Limite para Candidatura";
  dataConclusaoLabel: string = "Data de Conclusão";
  dataContestacaoLabel: string = "Data de Contestação";

  TitleWarning: string = "Aviso";
  Description: string = "Verificar texto para apresentar de acordo com a role, no figma!";
  Button: string = "Saiba mais";

  instanciarAtividades(): Observable<Atividade[]>{
    return this.atividadeService.listarTodasAtividades();
  }

  openDialog(atividade: Atividade) {
    const dialogRef = this.dialog.open(AtividadeComponent, {
      maxWidth: this.dialogWidth(),
      data: atividade
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(data);
  }

  dialogWidth() {
    if (window.innerWidth <= 768) {
      return "100vw";
    } else {
      return "80vw";
    }
  }

}
