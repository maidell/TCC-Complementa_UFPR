import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ComplexidadeService } from 'src/app/services/complexidade/services/complexidade.service';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { Complexidade, Graduacao } from 'src/app/shared';

@Component({
  selector: 'app-complexidades-dialog',
  templateUrl: './complexidades-dialog.component.html',
  styleUrls: ['./complexidades-dialog.component.scss']
})
export class ComplexidadesDialogComponent {
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  complexidade!: Complexidade;
  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  cargaHorariaMinima: FormControl = new FormControl();
  cargaHorariaMaxima: FormControl = new FormControl();
  graduacao!: Graduacao;
  complexidades: Complexidade[] = []

  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Complexidade>;
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public graduacaoService: GraduacaoService,
    public complexidadeService: ComplexidadeService,
    private changeDetectorRef: ChangeDetectorRef,
    public toastr: ToastrService
  ) {
    if (data) {
      this.complexidade = data.complexidade ?? new Complexidade;
      this.graduacao = data.graduacao ?? new Graduacao;
    } else {
      this.cancel();
    }
    if (!this.graduacao) {
      this.cancel();
    }

  }

  ngOnInit(): void {
    this.id.setValue(this.complexidade.id);
    this.nome.setValue(this.complexidade.nome);
    this.cargaHorariaMaxima.setValue(this.complexidade.cargaHorariaMaxima);
    this.cargaHorariaMinima.setValue(this.complexidade.cargaHorariaMinima);
  }

  complexForm = new FormGroup({
    id: new FormControl(""),
    nome: new FormControl(this.complexidade?.nome ?? ''),
    cargaHorariaMinima: new FormControl(this.complexidade?.cargaHorariaMinima ?? 0),
    cargaHorariaMaxima: new FormControl(this.complexidade?.cargaHorariaMaxima ?? 0)
  });

  saveComplexity() {
    this.complexidade.nome = this.nome.value;
    if (this.complexidade.id) {
      this.atualizarComplexidade(this.complexidade);
    } else {
      this.salvarComplexidade(this.complexidade);
    }
    this.changeDetectorRef.detectChanges();
    window.location.reload();
  }

  deleteComplexity() {
    this.graduacao.complexidades = this.graduacao.complexidades.filter(comp => comp.id !== this.complexidade.id);
    this.atualizarGraduacaoAntes(this.graduacao).subscribe(() => {
      this.deletarComplexidade(this.complexidade).subscribe(() => {
        this.toastr.success("Complexidade deletada!");
      }, (err) => {
        this.toastr.error("Erro ao deletar competência");
        console.log("Erro ao deletar competência: ", err);
      });
    }, (err) => {
      this.toastr.error("Erro ao atualizar graduação");
      console.log("Erro ao atualizar graduação: ", err);
    });
    this.changeDetectorRef.detectChanges();
    window.location.reload();
  }

  //close dialog
  cancel() {

  }

  salvarComplexidade(complexidade: Complexidade) {
    this.complexidadeService.inserirComplexidade(complexidade).subscribe(
      (res) => {
        this.complexidade = res;
        this.toastr.success("Complexidade salva!");
        this.graduacao.complexidades.push(this.complexidade);
        this.atualizarGraduacao(this.graduacao);
      },
      (err) => {
        this.toastr.error("Erro ao inserir competência");
        console.log("Erro ao inserir competência: ", err);
      }
    )
  }

  atualizarComplexidade(complexidade: Complexidade) {
    this.complexidadeService.atualizarComplexidade(complexidade).subscribe(
      (res) => {
        this.complexidade = res;
        this.toastr.success("Complexidade salva!");
        this.atualizarGraduacao(this.graduacao);
      },
      (err) => {
        this.toastr.error("Erro ao atualizar competência");
        console.log("Erro ao atualizar competência: ", err);
      }
    )
  }

  atualizarGraduacaoAntes(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.atualizarGraduacao(graduacao);
  }

  deletarComplexidade(complexidade: Complexidade): Observable<any> {
    return this.complexidadeService.removerComplexidade(complexidade.id);
  }

  atualizarGraduacao(graduacao: Graduacao) {
    this.graduacaoService.atualizarGraduacao(graduacao).subscribe(
      (res) => {
        this.graduacao = res;
        this.toastr.success("Graduação atualizada!");
      },
      (err) => {
        this.toastr.error("Erro ao atualizar graduação");
        console.log("Erro ao atualizar graduação: ", err, graduacao);
      }
    )
  }
}
