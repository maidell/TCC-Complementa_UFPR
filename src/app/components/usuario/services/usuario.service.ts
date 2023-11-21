import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "usuarios"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get adminLogado(): Usuario {
    let adminLogado = localStorage[LS_CHAVE];
    return adminLogado ? JSON.parse(adminLogado) : null;
  }

  public set adminLogado(admin: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(admin)
  }

  constructor(private httpClient: HttpClient) { }

  limparLS(): void {
    delete localStorage[LS_CHAVE];
  }

  listarTodosUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.BASE_URL + 'usuarios/', this.httpOptions);
  }

  inserirUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.BASE_URL + 'usuarios/', JSON.stringify(usuario), this.httpOptions);
  }

  buscarUsuarioPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.BASE_URL + 'usuarios/' + id, this.httpOptions);
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.BASE_URL + 'usuarios/' + usuario.id, JSON.stringify(usuario), this.httpOptions);
  }

  removerUsuario(id: number): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(this.BASE_URL + 'usuarios/' + id, this.httpOptions);
  }
}
