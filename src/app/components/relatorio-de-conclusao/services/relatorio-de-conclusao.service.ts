import { Injectable } from '@angular/core';
import { RelatorioDeConclusao } from 'src/app/shared'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioDeConclusaoService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosRelatoriosDeConclusao(): Observable<RelatorioDeConclusao[]> {
    return this.httpClient.get<RelatorioDeConclusao[]>(this.BASE_URL + 'relatorios-de-conclusao/', this.httpOptions);
  }

  inserirRelatorioDeConclusao(orientador: RelatorioDeConclusao): Observable<RelatorioDeConclusao> {
    return this.httpClient.post<RelatorioDeConclusao>(this.BASE_URL + 'relatorios-de-conclusao/', JSON.stringify(orientador), this.httpOptions);
  }

  buscarRelatorioDeConclusaoPorId(id: number): Observable<RelatorioDeConclusao> {
    return this.httpClient.get<RelatorioDeConclusao>(this.BASE_URL + 'relatorios-de-conclusao/' + id, this.httpOptions);
  }

  atualizarRelatorioDeConclusao(orientador: RelatorioDeConclusao): Observable<RelatorioDeConclusao> {
    return this.httpClient.put<RelatorioDeConclusao>(this.BASE_URL + 'relatorios-de-conclusao/' + orientador.id, JSON.stringify(orientador), this.httpOptions);
  }

  removerRelatorioDeConclusao(id: number): Observable<RelatorioDeConclusao> {
    return this.httpClient.delete<RelatorioDeConclusao>(this.BASE_URL + 'relatorios-de-conclusao/' + id, this.httpOptions);
  }
}
