import { Complexidade } from "./complexidade.model";
import { Graduacao } from "./graduacao.model";

export class Competencia {
    public id!: number;
    public nome: string = "";
    public graduacaoId!: Graduacao;
    public complexidadeId!: Complexidade;
  
    constructor(id?: number, nome?: string) {
      if (id) this.id = id;
      if (nome) this.nome = nome;
      if (this.graduacaoId) this.graduacaoId = new Graduacao();
      if (this.complexidadeId) this.complexidadeId = new Complexidade();
    }
  
  }
  