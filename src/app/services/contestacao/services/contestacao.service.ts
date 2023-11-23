import { Injectable } from '@angular/core';
import { Contestacao } from 'src/app/shared'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContestacaoService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodasContestacoes(): Observable<Contestacao[]> {
    return this.httpClient.get<Contestacao[]>(this.BASE_URL + 'contestacoes/', this.httpOptions);
  }

  inserirContestacao(orientador: Contestacao): Observable<Contestacao> {
    return this.httpClient.post<Contestacao>(this.BASE_URL + 'contestacoes/', JSON.stringify(orientador), this.httpOptions);
  }

  buscarContestacaoPorId(id: number): Observable<Contestacao> {
    return this.httpClient.get<Contestacao>(this.BASE_URL + 'contestacoes/' + id, this.httpOptions);
  }

  atualizarContestacao(orientador: Contestacao): Observable<Contestacao> {
    return this.httpClient.put<Contestacao>(this.BASE_URL + 'contestacoes/' + orientador.id, JSON.stringify(orientador), this.httpOptions);
  }

  removerContestacao(id: number): Observable<Contestacao> {
    return this.httpClient.delete<Contestacao>(this.BASE_URL + 'contestacoes/' + id, this.httpOptions);
  }
}
