import { Injectable } from '@angular/core';

import { Complexidade } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "complexidades"

@Injectable({
  providedIn: 'root'
})
export class ComplexidadeService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosComplexidades(): Observable<Complexidade[]> {
    return this.httpClient.get<Complexidade[]>(this.BASE_URL + 'complexidades/', this.httpOptions);
  }

  inserirComplexidade(complexidade: Complexidade): Observable<Complexidade> {
    return this.httpClient.post<Complexidade>(this.BASE_URL + 'complexidades/', JSON.stringify(complexidade), this.httpOptions);
  }

  buscarComplexidadePorId(id: number): Observable<Complexidade> {
    return this.httpClient.get<Complexidade>(this.BASE_URL + 'complexidades/' + id, this.httpOptions);
  }

  atualizarComplexidade(complexidade: Complexidade): Observable<Complexidade> {
    return this.httpClient.put<Complexidade>(this.BASE_URL + 'complexidades/' + complexidade.id, JSON.stringify(complexidade), this.httpOptions);
  }

  removerComplexidade(id: number): Observable<Complexidade> {
    return this.httpClient.delete<Complexidade>(this.BASE_URL + 'complexidades/' + id, this.httpOptions);
  }

}
