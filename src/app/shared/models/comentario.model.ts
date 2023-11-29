import { Usuario } from "./usuario.model";

export class Comentario {
    public id!: number;
    public usuario!: Usuario;
    public comentario!: string;
  
    constructor(
        id?: number,
        usuario?: Usuario,
        comentario?: string
    ) {
      if (id) this.id = id;
      if (usuario) this.usuario = usuario;
      if (comentario) this.comentario = comentario;      
    }

}
