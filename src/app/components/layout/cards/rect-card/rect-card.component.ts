import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rect-card',
  templateUrl: './rect-card.component.html',
  styleUrls: ['./rect-card.component.scss']
})
export class RectCardComponent{
  @Input() nome!: string;
  @Input() status!: string;
  @Input() firstLabel!: string;
  @Input() firstValue!: string;
  @Input() secondLabel!: string;
  @Input() secondValue!: string;
  @Input() thirdLabel!: string;
  @Input() thirdValue!: string;
  @Input() Texto!: string;
  @Input() buttonOne!: string;
  @Input() buttonTwo!: string;
  @Input() colorButtonOne?: string;
  @Input() colorButtonTwo?: string;
}
