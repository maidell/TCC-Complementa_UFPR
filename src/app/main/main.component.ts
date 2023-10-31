import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private breakpointObserver = inject(BreakpointObserver);

  userRole: string = 'Administrador'; // Altere para o perfil do usuário logado:
  // 'aluno' | 'coordenadorOrientador' | 'profOrientador' | 'Administrador';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    checkRole(role: string): boolean {
      return this.userRole === role;
    }
    logout() {
      // Implementar logout
    }
}
