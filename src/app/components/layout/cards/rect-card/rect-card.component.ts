import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() nameButtonRect?: string;
  @Input() buttonColor?: string;
  @Input() showButton: boolean = true;
  @Input() nameSecondButtonRect?: string;
  @Input() secondButtonColor?: string;
  @Input() showSecondButton: boolean = true;
  @Output() clickButtonRect = new EventEmitter<any>();
  @Output() clickSecondButtonRect = new EventEmitter<any>();

  //se for data
  @Input() firstValueDate!: string;
  @Input() secondValueDate!: string;
  @Input() thirdValueDate!: string;

  onButtonClick() {
    this.clickButtonRect.emit();
  }

  onSecondButtonClick() {
    this.clickSecondButtonRect.emit();
  }
}
