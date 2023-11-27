import { Aluno } from "./aluno.model";
import { Monitor } from "./monitor.model";
import { Orientador } from "./orientador.model";

export class Projeto {
  public id?: number;
  public nome: string = "";
  public status?: string = "";
  public tipo?: string = "";
  public objetivoGeral?: string = "";
  public objetivosEspecificos?: string = "";
  public orientador?: Orientador;
  public alunos?: Aluno[];
  public monitores?: Monitor[];
  
  constructor(
    id?: number,
    nome?: string,
    tipo?: string,
    objetivoGeral?: string,
    objetivosEspecificos?: string,
    orientador?: Orientador,
    alunos?: Aluno[],
    monitores?: Monitor[]
  ) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (tipo) this.tipo = tipo;
    if (objetivoGeral) this.objetivoGeral = objetivoGeral;
    if (objetivosEspecificos) this.objetivosEspecificos = objetivosEspecificos;
    if (orientador) this.orientador = orientador;
    if (alunos) this.alunos = alunos;
    if (monitores) this.monitores = monitores;
  }
}
