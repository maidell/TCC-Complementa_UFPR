import { Graduacao } from "./graduacao.model";
import { Usuario } from "./usuario.model";

export class Aluno extends Usuario {
  [x: string]: any;
  public grr: string = "";
  public graduacao!: Graduacao;

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    telefone?: string,
    senha?: string,
    papel?: string,
    grr?: string,
    graduacao?: Graduacao
  ) {
    super(id, nome, email, telefone, senha, papel);
    if (grr) this.grr = grr;
    if (graduacao) this.graduacao = graduacao;
  }

}
