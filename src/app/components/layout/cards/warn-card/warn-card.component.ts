import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warn-card',
  templateUrl: './warn-card.component.html',
  styleUrls: ['./warn-card.component.scss']
})
export class WarnCardComponent {
  @Input() TitleWarning!: string;
  @Input() Description!: string;
  @Input() Button!: string;
}
