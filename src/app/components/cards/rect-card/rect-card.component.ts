import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rect-card',
  templateUrl: './rect-card.component.html',
  styleUrls: ['./rect-card.component.scss']
})
export class RectCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() subtitle: string = '';
  @Input() date: string = '';
  @Input() author: string = '';
  @Input() executor: string = '';

}
