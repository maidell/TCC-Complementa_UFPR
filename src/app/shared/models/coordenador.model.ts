import { Graduacao } from "./graduacao.model";
import { Orientador } from "./orientador.model";

export class Coordenador extends Orientador {

    constructor(
        id?: number,
        nome?: string,
        email?: string,
        telefone?: string,
        senha?: string,
        papel?: string,
        matricula?: string,
        graduacao?: Graduacao
      ) {
        super(id, nome, email, telefone, senha, papel, matricula, graduacao);
      }
      
}