import { Injectable } from '@angular/core';

import { Comentario } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosComentarios(): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(this.BASE_URL + 'comentarios/', this.httpOptions);
  }

  inserirComentario(comentario: Comentario, id: number): Observable<Comentario> {
    return this.httpClient.post<Comentario>(this.BASE_URL + 'comentarios/' + id, JSON.stringify(comentario), this.httpOptions);
  }

  buscarComentarioPorId(id: number): Observable<Comentario> {
    return this.httpClient.get<Comentario>(this.BASE_URL + 'comentarios/' + id, this.httpOptions);
  }

  atualizarComentario(comentario: Comentario): Observable<Comentario> {
    return this.httpClient.put<Comentario>(this.BASE_URL + 'comentarios/' + comentario.id, JSON.stringify(comentario), this.httpOptions);
  }

  removerComentario(id: number): Observable<Comentario> {
    return this.httpClient.delete<Comentario>(this.BASE_URL + 'comentarios/' + id, this.httpOptions);
  }

}
