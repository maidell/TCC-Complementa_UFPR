import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmacaoService } from 'src/app/services/confirmacao/services/confirmacao.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent {
  email?: string;
  response?: string;

  constructor(
    private router: Router,
    private confirmacaoService: ConfirmacaoService,
    private route: ActivatedRoute
  ){
    this.email = route.snapshot.params['email'];
    if(this.email){
      this.confirmacaoService.enviarConfirmacao(this.email).subscribe(
        (res) => {this.response = res}
      );
    }

  }

  irParaLogin(){
    this.router.navigate(['login']);
  }

}
