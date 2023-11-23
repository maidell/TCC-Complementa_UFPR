import { Injectable } from '@angular/core';

import { Aluno, Graduacao } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE: string = "alunos"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get alunoLogado(): Aluno {
    let alunoLogado = localStorage[LS_CHAVE];
    return alunoLogado ? JSON.parse(alunoLogado) : null;
  }

  public set alunoLogado(aluno: Aluno) {
    localStorage[LS_CHAVE] = JSON.stringify(aluno)
  }

  constructor(private httpClient: HttpClient) { }

}
