import { Usuario } from "./usuario.model";

export class Contestacao {
    public id!: number;
    public descricao!: string;
    public tipoContestacao!: string;
    public dataContestacao!: Date;
    public status!: string;
    public autor!: Usuario;

    constructor(
      id?: number,
      descricao?: string,
      tipoContestacao?: string,
      dataContestacao?: Date,
      status?: string,
      autor?: Usuario
    ) {
      if (id) this.id = id;
      if (descricao) this.descricao = descricao;
      if (tipoContestacao) this.tipoContestacao = tipoContestacao
      if (dataContestacao) this.dataContestacao = dataContestacao;
      if (status) this.status = status;
      if (autor) this.autor = autor;
    }
  }
