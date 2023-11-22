import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/shared/models/servidor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graduacao } from 'src/app/shared';

const LS_CHAVE: string = "servidores"

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get adminLogado(): Servidor {
    let adminLogado = localStorage[LS_CHAVE];
    return adminLogado ? JSON.parse(adminLogado) : null;
  }

  public set adminLogado(admin: Servidor) {
    localStorage[LS_CHAVE] = JSON.stringify(admin)
  }

  constructor(private httpClient: HttpClient) { }

  limparLS(): void {
    delete localStorage[LS_CHAVE];
  }

  listarTodosServidores(): Observable<Servidor[]> {
    return this.httpClient.get<Servidor[]>(this.BASE_URL + 'servidores/', this.httpOptions);
  }

  inserirServidor(servidor: Servidor): Observable<Servidor> {
    return this.httpClient.post<Servidor>(this.BASE_URL + 'servidores/', JSON.stringify(servidor), this.httpOptions);
  }

  buscarServidorPorId(id: number): Observable<Servidor> {
    return this.httpClient.get<Servidor>(this.BASE_URL + 'servidores/' + id, this.httpOptions);
  }

  atualizarServidor(servidor: Servidor): Observable<Servidor> {
    return this.httpClient.put<Servidor>(this.BASE_URL + 'servidores/' + servidor.id, JSON.stringify(servidor), this.httpOptions);
  }

  removerServidor(id: number): Observable<Servidor> {
    return this.httpClient.delete<Servidor>(this.BASE_URL + 'servidores/' + id, this.httpOptions);
  }

  buscarGraduacaoPorId(id: number): Observable<Graduacao> {
    return this.httpClient.get<Graduacao>(this.BASE_URL + 'graduacoes/' + id, this.httpOptions);
  }

  atualizarGraduacao(graduacao: Graduacao): Observable<Graduacao> {
    return this.httpClient.put<Graduacao>(this.BASE_URL + 'graduacoes/' + graduacao.id, JSON.stringify(graduacao), this.httpOptions);
  }
}
