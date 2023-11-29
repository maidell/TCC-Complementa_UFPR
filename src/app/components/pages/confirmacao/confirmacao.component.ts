import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmacaoService } from 'src/app/services/confirmacao/services/confirmacao.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent {
  email?: string | null;
  response: string = 'Seu e-mail foi confirmado com sucesso!';
  remainingTime: number = 10;
  private timer: any;

  constructor(
    private confirmacao: ConfirmacaoService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    if(this.email){
      this.confirmacao.enviarConfirmacao(this.email!).subscribe(
        (res: string) => {
          this.startTimer();
        }
      );
    }else{
      this.response = 'E-mail não existe!'
      this.startTimer();
    }  
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer);
        this.irParaLogin();
      }
    }, 1000);
  }

  resetTimer() {
    this.remainingTime = 10;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
