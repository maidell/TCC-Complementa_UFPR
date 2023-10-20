import { Aluno } from "./aluno.model";
import { Monitor } from "./monitor.model";
import { Orientador } from "./orientador.model";

export class Projeto {
  public id?: number;
  public nome: string = "";
  public descricao: string = "";
  public orientador?: Orientador;
  public alunos?: Aluno[];
  public monitores?: Monitor[];

  constructor(
    id?: number,
    nome?: string,
    descricao?: string,
    orientador?: Orientador,
    alunos?: Aluno[],
    monitores?: Monitor[]
  ) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (descricao) this.descricao = descricao;
    if (orientador) this.orientador = orientador;
    if (alunos) this.alunos = alunos;
    if (monitores) this.monitores = monitores;
  }
}
