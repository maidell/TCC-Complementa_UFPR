import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Competencia, Coordenador, Graduacao } from 'src/app/shared';

@Component({
  selector: 'app-graduacoes-dialog',
  templateUrl: './graduacoes-dialog.component.html',
  styleUrls: ['./graduacoes-dialog.component.scss']
})
export class GraduacoesDialogComponent  {
  @ViewChild('formCompetencia') formAluno!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;
  
  graduacoes: Graduacao[] = [{
    id: 1, nome: "Graduação 1", coordenador: new Coordenador(), competencias: [new Competencia(), new Competencia()],
    
  }]
 
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Graduacao>;
  constructor(@Inject(DIALOG_DATA) public data: Graduacao, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.graduacoes);
  }
  gradForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nomeDoCurso: new FormControl(['']),
    coordenador: new FormControl(),
    
  });

  id: FormControl = new FormControl();
  nomeDoCurso: FormControl = new FormControl();
  coordenador: FormControl = new FormControl();


  saveComplexity(){}
  deleteComplexity(){}
  //close dialog
  cancel(){
    
  }
}
