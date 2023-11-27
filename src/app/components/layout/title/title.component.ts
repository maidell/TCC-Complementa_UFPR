import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  title!: string;

  constructor(private titleService: TitleService, private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.titleService.title$.subscribe(newTitle => {

      this.title = newTitle!;
      this.cdr.detectChanges();
    });

  }



}
