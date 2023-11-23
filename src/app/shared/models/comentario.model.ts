import { Usuario } from "./usuario.model";

export class Comentario {
    public id!: number;
    public usuario!: Usuario;
    public mensagem: string = "";
  
    constructor(
        id?: number,
        usuario?: Usuario,
        mensagem?: string
    ) {
      if (id) this.id = id;
      if (usuario) this.usuario = usuario;
      if (mensagem) this.mensagem = mensagem;
    }

}
