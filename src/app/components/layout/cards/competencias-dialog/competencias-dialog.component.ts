import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CompetenciaService } from 'src/app/services/competencia/services/competencia.service';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { Competencia, Graduacao } from 'src/app/shared';

@Component({
  selector: 'app-competencias-dialog',
  templateUrl: './competencias-dialog.component.html',
  styleUrls: ['./competencias-dialog.component.scss']
})
export class CompetenciasDialogComponent implements OnInit{
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;
  
  competencia!: Competencia;
  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  graduacao!: Graduacao;

  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Competencia>;
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public graduacaoService: GraduacaoService,
    public competenciaService: CompetenciaService,
    private changeDetectorRef: ChangeDetectorRef,
    public toastr: ToastrService
    )
     {
      if (data) {
        this.competencia = data.competencia ?? new Competencia;
        this.graduacao = data.graduacao ?? new Graduacao;
      } else {
        this.cancel();
      }
      if(this.graduacao){
        this.cancel();
      }

  }
  
  ngOnInit(): void {
    this.id.setValue(this.competencia.id);
    this.nome.setValue(this.competencia.nome);
  }

  gradForm = new FormGroup({
    nome: new FormControl(this.competencia?.nome ?? '')
  });

  saveComplexity(){
    this.competencia.nome = this.nome.value;
    if(this.competencia.id){
      this.atualizarCompetencia(this.competencia);
    }else{
      this.salvarCompetencia(this.competencia);
    }
  }
  
  deleteComplexity(){
    this.graduacao.competencias = this.graduacao.competencias.filter(comp => comp.id !== this.competencia.id);
      this.atualizarGraduacaoAntes(this.graduacao).subscribe(() => {
        this.deletarCompetencia(this.competencia).subscribe(() => {
          this.toastr.success("Competência deletada!");
        }, (err) => {
          this.toastr.error("Erro ao deletar competência");
          console.log("Erro ao deletar competência: ", err);
        });
      }, (err) => {
        this.toastr.error("Erro ao atualizar graduação");
        console.log("Erro ao atualizar graduação: ", err);
      });
    }
  
  //close dialog
  cancel(){
  }

  salvarCompetencia(competencia: Competencia){
    this.competenciaService.inserirCompetencia(competencia).subscribe(
      (res) => {
        this.competencia = res;
        this.toastr.success("Competência salva!");
        this.graduacao.competencias.push(this.competencia);
        this.atualizarGraduacao(this.graduacao);
      },
      (err) => {
        this.toastr.error("Erro ao inserir competência");
        console.log("Erro ao inserir competência: ", err);
      }
    )
  }

  atualizarCompetencia(competencia: Competencia){
    this.competenciaService.atualizarCompetencia(competencia).subscribe(
      (res) => {
        this.competencia = res;
        this.toastr.success("Competência salva!");
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

  deletarCompetencia(competencia: Competencia): Observable<any> {
    return this.competenciaService.removerCompetencia(competencia.id);
  }

  atualizarGraduacao(graduacao: Graduacao){
    this.graduacaoService.atualizarGraduacao(graduacao).subscribe(
      (res) => {
        this.competencia = res;
        this.toastr.success("Graduação atualizada!");
      },
      (err) => {
        this.toastr.error("Erro ao atualizar graduação");
        console.log("Erro ao atualizar graduação: ", err, graduacao);
      }
    )
  }

}
