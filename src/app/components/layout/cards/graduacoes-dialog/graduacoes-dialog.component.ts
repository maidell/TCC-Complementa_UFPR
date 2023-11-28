import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GraduacaoService } from 'src/app/services/graduacao/services/graduacao.service';
import { Graduacao, Orientador } from 'src/app/shared';

@Component({
  selector: 'app-graduacoes-dialog',
  templateUrl: './graduacoes-dialog.component.html',
  styleUrls: ['./graduacoes-dialog.component.scss']
})
export class GraduacoesDialogComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  coordenador: FormControl = new FormControl();
  graduacao!: Graduacao;
  coordenadores: Orientador[] = [];
  
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Graduacao>;
  constructor(@Inject(DIALOG_DATA) public data: Graduacao,
   private changeDetectorRef: ChangeDetectorRef,
   public graduacaoService: GraduacaoService,
    public toastr: ToastrService
    ) {
      if (data) {
        console.log(data);
        this.graduacao = data;
      }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  gradForm = new FormGroup({
    nomeDoCurso: this.id,
    coordenador: this.nome,
    
  });

  saveGraduation(){
    this.graduacao.id = this.id.value;
    this.graduacao.nome = this.nome.value;
    this.graduacao.coordenador = this.coordenador.value;
    if(this.graduacao.id){
      this.atualizarGraduacao(this.graduacao).subscribe(
        (res: Graduacao) => {
          this.graduacao = res;
          this.toastr.success('Graduacao atualizada com sucesso!');
        },
        (err) => {
          this.toastr.error('Erro ao atualizar Graduacao!');
          console.log('Erro ao atualizar Graduacao!', err);
        }
      );
    }else{
      this.salvarGraduacao(this.graduacao).subscribe(
        (res: Graduacao) => {
          this.graduacao = res;
          this.toastr.success('Graduacao salva com sucesso!');
        },
        (err) => {
          this.toastr.error('Erro ao salvar Graduacao!');
          console.log('Erro ao salvar Graduacao!', err);
        }
      );
    }
    this.changeDetectorRef.detectChanges();
      window.location.reload();
  }
  
  deleteGraduation(){
    this.changeDetectorRef.detectChanges();
      window.location.reload();
      }

  //close dialog
  cancel(){
    
  }

  salvarGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.inserirGraduacao(graduacao);
  }

  atualizarGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.atualizarGraduacao(graduacao);
  }

  removerGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.removerGraduacao(graduacao.id);
  }

  buscarGraduacao(graduacao: Graduacao): Observable<any> {
    return this.graduacaoService.buscarGraduacaoPorId(graduacao.id);
  }

}