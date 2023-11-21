import { Injectable } from '@angular/core';

import { Coordenador, Graduacao } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "coordenadores"

@Injectable({
  providedIn: 'root'
})
export class CoordenadorService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get coordenadorLogado(): Coordenador {
    let coordenadorLogado = localStorage[LS_CHAVE];
    return coordenadorLogado ? JSON.parse(coordenadorLogado) : null;
  }

  public set coordenadorLogado(coordenador: Coordenador) {
    localStorage[LS_CHAVE] = JSON.stringify(coordenador)
  }

  constructor(private httpClient: HttpClient) { }

  limparLS(): void {
    delete localStorage[LS_CHAVE];
  }

  listarTodosCoordenadores(): Observable<Coordenador[]> {
    return this.httpClient.get<Coordenador[]>(this.BASE_URL + 'coordenadores/', this.httpOptions);
  }

  inserirCoordenador(coordenador: Coordenador): Observable<Coordenador> {
    return this.httpClient.post<Coordenador>(this.BASE_URL + 'coordenadores/', JSON.stringify(coordenador), this.httpOptions);
  }

  buscarCoordenadorPorId(id: number): Observable<Coordenador> {
    return this.httpClient.get<Coordenador>(this.BASE_URL + 'coordenadores/' + id, this.httpOptions);
  }

  buscarCoordenadorPorEmail(email: string): Observable<Coordenador> {
    return this.httpClient.get<Coordenador>(this.BASE_URL + 'coordenadores/' + email, this.httpOptions);
  }

  atualizarCoordenador(coordenador: Coordenador): Observable<Coordenador> {
    return this.httpClient.put<Coordenador>(this.BASE_URL + 'coordenadores/' + coordenador.id, JSON.stringify(coordenador), this.httpOptions);
  }

  removerCoordenador(id: number): Observable<Coordenador> {
    return this.httpClient.delete<Coordenador>(this.BASE_URL + 'coordenadores/' + id, this.httpOptions);
  }

}
