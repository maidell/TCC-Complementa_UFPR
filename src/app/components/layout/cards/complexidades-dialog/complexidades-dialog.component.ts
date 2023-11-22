import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Complexidade } from 'src/app/shared';

@Component({
  selector: 'app-complexidades-dialog',
  templateUrl: './complexidades-dialog.component.html',
  styleUrls: ['./complexidades-dialog.component.scss']
})
export class ComplexidadesDialogComponent {
  @ViewChild('formCompetencia') formAluno!: NgForm;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;


  complexidades: Complexidade [] = [
    { id: 1, nome: 'Complexidade 1', cargaHorariaMinima: 0, cargaHorariaMaxima: 20 },
  ]

  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Complexidade>;
  constructor(@Inject(DIALOG_DATA) public data: Complexidade, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.complexidades);
  }
  complexForm = new FormGroup({
    id: new FormControl(""),
    nome: new FormControl(['']),
    cargaHorariaMinima: new FormControl(),
    cargaHorariaMaxima: new FormControl(),
  });

  id: FormControl = new FormControl();
  nome: FormControl = new FormControl();
  cargaHorariaMinima: FormControl = new FormControl();
  cargaHorariaMaxima: FormControl = new FormControl();


  saveComplexity(){}
  deleteComplexity(){}
  //close dialog
  cancel(){
    
  }
}
