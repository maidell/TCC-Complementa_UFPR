import { Injectable } from '@angular/core';
import { Competencia } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "competencias"

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  limparLS(): void {
    delete localStorage[LS_CHAVE];
  }

  listarTodasCompetencias(): Observable<Competencia[]> {
    return this.httpClient.get<Competencia[]>(this.BASE_URL + 'competencias/', this.httpOptions);
  }

  inserirCompetencia(competencias: Competencia): Observable<Competencia> {
    return this.httpClient.post<Competencia>(this.BASE_URL + 'competencias/', JSON.stringify(competencias), this.httpOptions);
  }

  buscarCompetenciaPorId(id: number): Observable<Competencia> {
    return this.httpClient.get<Competencia>(this.BASE_URL + 'competencias/' + id, this.httpOptions);
  }

  atualizarCompetencia(competencias: Competencia): Observable<Competencia> {
    return this.httpClient.put<Competencia>(this.BASE_URL + 'competencias/' + competencias.id, JSON.stringify(competencias), this.httpOptions);
  }

  removerCompetencia(id: number): Observable<Competencia> {
    return this.httpClient.delete<Competencia>(this.BASE_URL + 'competencias/' + id, this.httpOptions);
  }
}
