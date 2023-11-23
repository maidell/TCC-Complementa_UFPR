import { Injectable } from '@angular/core';
import { Projeto } from 'src/app/shared'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosProjetos(): Observable<Projeto[]> {
    return this.httpClient.get<Projeto[]>(this.BASE_URL + 'projetos/', this.httpOptions);
  }

  inserirProjeto(orientador: Projeto): Observable<Projeto> {
    return this.httpClient.post<Projeto>(this.BASE_URL + 'projetos/', JSON.stringify(orientador), this.httpOptions);
  }

  buscarProjetoPorId(id: number): Observable<Projeto> {
    return this.httpClient.get<Projeto>(this.BASE_URL + 'projetos/' + id, this.httpOptions);
  }

  atualizarProjeto(orientador: Projeto): Observable<Projeto> {
    return this.httpClient.put<Projeto>(this.BASE_URL + 'projetos/' + orientador.id, JSON.stringify(orientador), this.httpOptions);
  }

  removerProjeto(id: number): Observable<Projeto> {
    return this.httpClient.delete<Projeto>(this.BASE_URL + 'projetos/' + id, this.httpOptions);
  }
}
