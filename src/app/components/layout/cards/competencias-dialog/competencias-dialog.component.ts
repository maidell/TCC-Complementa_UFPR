import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Competencia } from 'src/app/shared';

@Component({
  selector: 'app-competencias-dialog',
  templateUrl: './competencias-dialog.component.html',
  styleUrls: ['./competencias-dialog.component.scss']
})
export class CompetenciasDialogComponent  {
  @ViewChild('formCompetencia') formAluno!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;
  
  competencias: Competencia[] = [];
 
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Competencia>;
  constructor(@Inject(DIALOG_DATA) public data: Competencia, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.competencias);
  }
  gradForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nome: new FormControl([''])
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
