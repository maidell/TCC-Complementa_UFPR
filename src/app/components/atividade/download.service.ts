import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver'; 

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private httpClient: HttpClient) { }
  downloadFile(url: string, fileName: string): void {
    console.log("entrou no service");
    this.httpClient.get(url, { responseType: 'blob' }).subscribe((data) => {
      saveAs(data, fileName);
    });
  }
}
