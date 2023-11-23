import { Injectable } from '@angular/core';

import { Atividade } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "atividades"

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get atividadeLogado(): Atividade {
    let atividadeLogado = localStorage[LS_CHAVE];
    return atividadeLogado ? JSON.parse(atividadeLogado) : null;
  }

  public set atividadeLogado(atividade: Atividade) {
    localStorage[LS_CHAVE] = JSON.stringify(atividade)
  }

  constructor(private httpClient: HttpClient) { }

  limparLS(): void {
    delete localStorage[LS_CHAVE];
  }

  listarTodosAtividades(): Observable<Atividade[]> {
    return this.httpClient.get<Atividade[]>(this.BASE_URL + 'atividades/', this.httpOptions);
  }

  inserirAtividade(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.post<Atividade>(this.BASE_URL + 'atividades/', JSON.stringify(atividade), this.httpOptions);
  }

  autocadastrarAtividade(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.post<Atividade>(this.BASE_URL + 'autocadastro', JSON.stringify(atividade), this.httpOptions);
  }

  buscarAtividadePorId(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(this.BASE_URL + 'atividades/' + id, this.httpOptions);
  }

  atualizarAtividade(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.put<Atividade>(this.BASE_URL + 'atividades/' + atividade.id, JSON.stringify(atividade), this.httpOptions);
  }

  removerAtividade(id: number): Observable<Atividade> {
    return this.httpClient.delete<Atividade>(this.BASE_URL + 'atividades/' + id, this.httpOptions);
  }

}