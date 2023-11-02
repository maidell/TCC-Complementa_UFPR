import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userName="Leonardo Henrique de Souza Hortmann";
  grr="20231234";
  name=this.userName.split(/[, ]+/);
  displayName='';

  ngOnInit(): void {
    this.printName();
  }

  printName(){
    if (this.name.length===2){
      this.displayName=`${this.name[0]} ${this.name[1]}`;
    } else {
      this.displayName=`${this.name[0]} ${this.name[(this.name.length-1)]}`;
    }
  }


}
