import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rect-card',
  templateUrl: './rect-card.component.html',
  styleUrls: ['./rect-card.component.scss']
})
export class RectCardComponent {
  @Input() Title: string = 'Nome do servidor';
  @Input() firstLabel: string = 'Data de nasc.';
  @Input() firstValue: string = 'dd/mm/aaaa';
  @Input() secondLabel: string = 'Email';
  @Input() secondValue: string = 'emaildoservidor@ufpr.br';
  @Input() thirdLabel: string = 'Papel';
  @Input() thirdValue: string = 'Titulo do papel';


}
