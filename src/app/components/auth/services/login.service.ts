import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { Usuario, Login } from 'src/app/shared';
import { ApiResponseLogin } from 'src/app/interfaces/api-response-login';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }; 

  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }
  
  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    this.usuarioLogadoSubject.next(null);
    this.httpClient.post<ApiResponseLogin>(this.BASE_URL + '/logout', this.httpOptions).subscribe();
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario> {
    return this.httpClient.post<ApiResponseLogin>(this.BASE_URL + '/login', JSON.stringify(login), this.httpOptions)
      .pipe(
        map(response => {
          const usuario = response.data;
          if (usuario) {
            this.usuarioLogado = usuario;
            this.usuarioLogadoSubject.next(usuario);
          }
          return usuario;
        })
      );
  }

  validarSenha(login: Login): Observable<Boolean> {
    return this.httpClient.post<Boolean>(this.BASE_URL + '/authPassword', JSON.stringify(login), this.httpOptions);
  }
  
}
