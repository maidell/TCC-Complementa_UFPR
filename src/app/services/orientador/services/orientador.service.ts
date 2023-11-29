import { Injectable } from '@angular/core';
import { Orientador } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrientadorService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosOrientadores(): Observable<Orientador[]> {
    return this.httpClient.get<Orientador[]>(this.BASE_URL + 'orientadores/', this.httpOptions);
  }

  listarTodosOrientadoresPorGraducao(id: number): Observable<Orientador[]> {
    return this.httpClient.get<Orientador[]>(this.BASE_URL + 'orientadores/graduacoes/' + id, this.httpOptions);
  }

  inserirOrientador(orientador: Orientador): Observable<Orientador> {
    return this.httpClient.post<Orientador>(this.BASE_URL + 'orientadores/', JSON.stringify(orientador), this.httpOptions);
  }

  buscarOrientadorPorId(id: number): Observable<Orientador> {
    return this.httpClient.get<Orientador>(this.BASE_URL + 'orientadores/' + id, this.httpOptions);
  }

  atualizarOrientador(orientador: Orientador): Observable<Orientador> {
    return this.httpClient.put<Orientador>(this.BASE_URL + 'orientadores/' + orientador.id, JSON.stringify(orientador), this.httpOptions);
  }

  removerOrientador(id: number): Observable<Orientador> {
    return this.httpClient.delete<Orientador>(this.BASE_URL + 'orientadores/' + id, this.httpOptions);
  }
}
