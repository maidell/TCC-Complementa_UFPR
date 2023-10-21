import { Component } from '@angular/core';

@Component({
  selector: 'app-home-aluno',
  templateUrl: './home-aluno.component.html',
  styleUrls: ['./home-aluno.component.scss']
})
export class HomeAlunoComponent {

  navBar=0;
  content=0;


  ngOnInit() {
    this.handleResize();
  }


  handleResize(){
    if (window.innerWidth<=576){

    } else if (window.innerWidth<=768) {

    } else if (window.innerWidth<=1200) {

    } else {

    }
  }
}
