import { Servidor } from "./servidor.model";

export class ServidorCoordenador extends Servidor {

        constructor(
          id?: number,
          nome?: string,
          email?: string,
          telefone?: string,
          senha?: string,
          papel?: string,
          matricula?: string
        ) {
          super(id, nome, email, telefone, senha, papel, matricula);
        }

}
