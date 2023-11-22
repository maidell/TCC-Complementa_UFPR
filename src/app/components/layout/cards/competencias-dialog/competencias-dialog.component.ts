import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Competencia, Complexidade, Graduacao } from 'src/app/shared';

@Component({
  selector: 'app-competencias-dialog',
  templateUrl: './competencias-dialog.component.html',
  styleUrls: ['./competencias-dialog.component.scss']
})
export class CompetenciasDialogComponent  {
  @ViewChild('formCompetencia') formAluno!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;
  
  // public id!: number;
  //   public nome: string = "";
  competencias: Competencia[] = [
    {id: 1, nome: "Competência 1", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 2, nome: "Competência 2", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 3, nome: "Competência 3", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 4, nome: "Competência 4", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 5, nome: "Competência 5", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 6, nome: "Competência 6", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 7, nome: "Competência 7", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 8, nome: "Competência 8", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 9, nome: "Competência 9", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},
    {id: 10, nome: "Competência 10", graduacaoId: new Graduacao(), complexidadeId: new Complexidade()},

  ]
 
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Competencia>;
  constructor(@Inject(DIALOG_DATA) public data: Competencia, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.competencias);
  }
  gradForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nome: new FormControl(['']),    
    graduacaoId: new FormControl(),
    complexidadeId: new FormControl(),
  });

  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  graduacaoId: FormControl = new FormControl();
  complexidadeId: FormControl = new FormControl();


  saveComplexity(){}
  deleteComplexity(){}
  //close dialog
  cancel(){
    
  }
}
