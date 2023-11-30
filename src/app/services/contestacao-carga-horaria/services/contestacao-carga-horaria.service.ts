import { Injectable } from '@angular/core';

import { ContestacaoCargaHoraria } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContestacaoCargaHorariaService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodasContestacoesCargaHoraria(): Observable<ContestacaoCargaHoraria[]> {
    return this.httpClient.get<ContestacaoCargaHoraria[]>(this.BASE_URL + 'contestacoes-carga-horaria/', this.httpOptions);
  }

  inserirContestacaoCargaHoraria(contestacaoCargaHoraria: ContestacaoCargaHoraria): Observable<ContestacaoCargaHoraria> {
    return this.httpClient.post<ContestacaoCargaHoraria>(this.BASE_URL + 'contestacoes-carga-horaria/', JSON.stringify(contestacaoCargaHoraria), this.httpOptions);
  }

  buscarContestacaoCargaHorariaPorId(id: number): Observable<ContestacaoCargaHoraria> {
    return this.httpClient.get<ContestacaoCargaHoraria>(this.BASE_URL + 'contestacoes-carga-horaria/' + id, this.httpOptions);
  }

  atualizarContestacaoCargaHoraria(contestacaoCargaHoraria: ContestacaoCargaHoraria): Observable<ContestacaoCargaHoraria> {
    return this.httpClient.put<ContestacaoCargaHoraria>(this.BASE_URL + 'contestacoes-carga-horaria/' + contestacaoCargaHoraria.id, JSON.stringify(contestacaoCargaHoraria), this.httpOptions);
  }

  removerContestacaoCargaHoraria(id: number): Observable<ContestacaoCargaHoraria> {
    return this.httpClient.delete<ContestacaoCargaHoraria>(this.BASE_URL + 'contestacoes-carga-horaria/' + id, this.httpOptions);
  }

}
