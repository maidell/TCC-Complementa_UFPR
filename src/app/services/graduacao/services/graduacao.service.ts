import { Injectable } from '@angular/core';

import { Graduacao } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "graduacoes"

@Injectable({
  providedIn: 'root'
})
export class GraduacaoService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodasGraduacoes(): Observable<Graduacao[]> {
    return this.httpClient.get<Graduacao[]>(this.BASE_URL + 'graduacoes/', this.httpOptions);
  }

  inserirGraduacao(graduacao: Graduacao): Observable<Graduacao> {
    return this.httpClient.post<Graduacao>(this.BASE_URL + 'graduacoes/', JSON.stringify(graduacao), this.httpOptions);
  }

  buscarGraduacaoPorId(id: number): Observable<Graduacao> {
    return this.httpClient.get<Graduacao>(this.BASE_URL + 'graduacoes/' + id, this.httpOptions);
  }

  buscarGraduacaoPorIdCoordenador(id: number): Observable<Graduacao> {
    return this.httpClient.get<Graduacao>(this.BASE_URL + 'graduacoes/coordenadores/' + id, this.httpOptions);
  }

  atualizarGraduacao(graduacao: Graduacao): Observable<Graduacao> {
    return this.httpClient.put<Graduacao>(this.BASE_URL + 'graduacoes/' + graduacao.id, JSON.stringify(graduacao), this.httpOptions);
  }

  removerGraduacao(id: number): Observable<Graduacao> {
    return this.httpClient.delete<Graduacao>(this.BASE_URL + 'graduacoes/' + id, this.httpOptions);
  }

}
