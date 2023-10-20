export class Competencia {
    public id!: number;
    public nome: string = "";
  
    constructor(id?: number, nome?: string) {
      if (id) this.id = id;
      if (nome) this.nome = nome;
    }
  
  }
  