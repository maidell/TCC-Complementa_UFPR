import { Usuario } from "./usuario.model";

export class Servidor extends Usuario {
  public matricula: string = "";
  public incluido?: boolean;

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    telefone?: string,
    senha?: string,
    papel?: string,
    matricula?: string,
    incluido?: boolean
  ) {
    super(id, nome, email, telefone, senha, papel);
    if (matricula) this.matricula = matricula;
    if (incluido) this.incluido = incluido;
  }
}