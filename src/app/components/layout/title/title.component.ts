import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  title!: string;

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.title$.subscribe(newTitle => {

      this.title = newTitle!;

    });

  }



}
