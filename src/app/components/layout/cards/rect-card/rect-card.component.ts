import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rect-card',
  templateUrl: './rect-card.component.html',
  styleUrls: ['./rect-card.component.scss']
})
export class RectCardComponent{
  @Input() nome!: string;
  @Input() status!: string;
  @Input() dataCriacaoLabel!: string;
  @Input() dataCriacao!: Date;
  @Input() dataLimiteCandidaturaLabel!: string;
  @Input() dataLimiteCandidatura!: Date;
  @Input() dataConclusaoLabel!: string;
  @Input() dataConclusao!: Date;
  @Input() Texto!: string;
  @Input() nameButtonRect!: string;
}
