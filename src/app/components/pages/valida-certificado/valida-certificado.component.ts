import { Component, OnInit } from '@angular/core';
import { CertificadoService } from 'src/app/services/certificado/services/certificado.service';
import { TitleService } from 'src/app/services/title/title.service';
import { Certificado } from 'src/app/shared';

@Component({
  selector: 'app-valida-certificado',
  templateUrl: './valida-certificado.component.html',
  styleUrls: ['./valida-certificado.component.scss']
})
export class ValidaCertificadoComponent implements OnInit{
  ngOnInit(): void {
    this.title.setTitle('Validar certificado');
  }

  hash: string = '';
  certificado: Certificado | null = null;
  validacaoStatus: string = '';

  constructor(
    private certificadoService: CertificadoService,
    private title: TitleService,
    ) { }

  validarCertificado() {
    const encodedHash = encodeURIComponent(this.hash.trim());
    if (encodedHash !== '') {
      this.certificadoService.buscarCertificadoPorHash(encodedHash)
        .subscribe(
          (certificado: Certificado) => {
            if (certificado && certificado.id) {
              this.certificado = certificado;
              this.validacaoStatus = 'Certificado válido!';
            } else {
              this.validacaoStatus = 'Certificado inválido!';
              this.certificado = null;
            }
          },
          (error) => {
            this.validacaoStatus = 'Erro ao buscar certificado.';
            this.certificado = null;
          }
        );
    } else {
      this.validacaoStatus = 'Por favor, insira um hash válido!';
      this.certificado = null;
    }
  }
}
