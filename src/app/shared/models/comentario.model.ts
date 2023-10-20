import { Usuario } from "./usuario.model";

export class Comentario {

    public usuario!: Usuario;
    public mensagem: string = "";
  
    constructor(
        usuario?: Usuario,
        mensagem?: string
    ) {
      if (usuario) this.usuario = usuario;
      if (mensagem) this.mensagem = mensagem;
    }

}
