import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anexo } from 'src/app/shared/models/anexo.model';

const LS_CHAVE: string = "anexos"

@Injectable({
  providedIn: 'root'
})
export class AnexoService {
  BASE_URL = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosAnexos(): Observable<Anexo[]> {
    return this.httpClient.get<Anexo[]>(this.BASE_URL + 'anexos/', this.httpOptions);
  }

  inserirAnexoAtividade(file: File, atividadeId: number): Observable<Anexo> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<Anexo>(this.BASE_URL + 'anexos/atividades/upload/' + atividadeId, formData);
  }

  inserirAnexoRelatorio(file: File, relatorioId: number): Observable<Anexo> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<Anexo>(this.BASE_URL + 'anexos/relatorios/upload/' + relatorioId, formData);
  }

  downloadAnexoPorId(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'anexos/download/' + id, {responseType: 'blob' as 'json'});
  }

  atualizarAnexo(anexo: Anexo): Observable<Anexo> {
    return this.httpClient.put<Anexo>(this.BASE_URL + 'anexos/' + anexo.id, JSON.stringify(anexo), this.httpOptions);
  }

  removerAnexo(id: number): Observable<Anexo> {
    return this.httpClient.delete<Anexo>(this.BASE_URL + 'anexos/' + id, this.httpOptions);
  }

}
