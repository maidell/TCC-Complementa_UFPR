import { Injectable } from '@angular/core';
import { Orientador } from 'src/app/shared/models/orientador.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "orientadores"

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

  public get adminLogado(): Orientador {
    let adminLogado = localStorage[LS_CHAVE];
    return adminLogado ? JSON.parse(adminLogado) : null;
  }

  public set adminLogado(admin: Orientador) {
    localStorage[LS_CHAVE] = JSON.stringify(admin)
  }

  constructor(private httpClient: HttpClient) { }

  limparLS(): void {
    delete localStorage[LS_CHAVE];
  }

  listarTodosOrientadores(): Observable<Orientador[]> {
    return this.httpClient.get<Orientador[]>(this.BASE_URL + 'orientadores/', this.httpOptions);
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
