import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.scss']
})
export class SquareCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
}
