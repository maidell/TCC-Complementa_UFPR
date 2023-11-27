import { Injectable } from '@angular/core';

import { Certificado } from 'src/app/shared';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosCertificados(): Observable<Certificado[]> {
    return this.httpClient.get<Certificado[]>(this.BASE_URL + 'certificados/', this.httpOptions);
  }

  inserirCertificado(certificado: Certificado, id: number): Observable<Certificado> {
    return this.httpClient.post<Certificado>(this.BASE_URL + 'certificados/' + id, JSON.stringify(certificado), this.httpOptions);
  }

  buscarCertificadoPorId(id: number): Observable<Certificado> {
    return this.httpClient.get<Certificado>(this.BASE_URL + 'certificados/' + id, this.httpOptions);
  }

  buscarCertificadoPorHash(hash: string): Observable<Certificado> {
    return this.httpClient.get<Certificado>(this.BASE_URL + 'certificados/consultas/' + hash, this.httpOptions);
  }

  atualizarCertificado(certificado: Certificado): Observable<Certificado> {
    return this.httpClient.put<Certificado>(this.BASE_URL + 'certificados/' + certificado.id, JSON.stringify(certificado), this.httpOptions);
  }

  removerCertificado(id: number): Observable<Certificado> {
    return this.httpClient.delete<Certificado>(this.BASE_URL + 'certificados/' + id, this.httpOptions);
  }

}
