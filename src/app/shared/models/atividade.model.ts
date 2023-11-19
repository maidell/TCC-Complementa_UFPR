import { Competencia } from "./competencia.model";
import { Complexidade } from "./complexidade.model";
import { Comentario } from "./comentario.model";

export class Atividade {
  public id!: number;
  public status: string = "Nova"; // Nova, Aberta, Em Execução, Carga Horária Contestada, Execução Contestada, Finalizada
  public nome: string = "";
  public dataCriacao: Date = new Date();
  public dataLimiteCandidatura: Date = new Date();
  public dataContestacao?: Date = new Date();
  public dataConclusao: Date = new Date();
  public competencia?: Competencia;
  public complexidade?: Complexidade;
  public comentarios?: Comentario[];

  constructor(
    id?: number,
    nome?: string,
    dataCriacao?: Date,
    dataLimiteCandidatura?: Date,
    dataContestacao?: Date,
    dataConclusao?: Date,
    competencia?: Competencia,
    complexidade?: Complexidade,
    comentarios?: Comentario[]
  ) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (dataCriacao) this.dataCriacao = dataCriacao;
    if (dataLimiteCandidatura) this.dataLimiteCandidatura = dataLimiteCandidatura;
    if (dataContestacao) this.dataContestacao = dataContestacao;
    if (dataConclusao) this.dataConclusao = dataConclusao;
    if (competencia) this.competencia = competencia;
    if (complexidade) this.complexidade = complexidade;
    if (comentarios) this.comentarios = comentarios;
  }

}
