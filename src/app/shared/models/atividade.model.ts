import { Competencia } from "./competencia.model";
import { Complexidade } from "./complexidade.model";
import { Comentario } from "./comentario.model";
import { Anexo } from "./anexo.model";
import { Certificado } from "./certificado.model";
import { Contestacao } from "./contestacao.model";
import { Projeto } from "./projeto.model";
import { RelatorioDeConclusao } from "./relatorio-de-conclusao.model";
import { Usuario } from "./usuario.model";
import { ContestacaoCargaHoraria } from "./contestacao-carga-horaria.model";

export class Atividade {
  public id?: number;
  public nome?: string;
  public descricao?: string;
  public dataCriacao?: Date;
  public dataLimiteCandidatura?: Date;
  public dataConclusao?: Date;
  public projeto?: Projeto;
  public autor?: Usuario; 
  public executor?: Usuario;
  public competencia?: Competencia;
  public complexidade?: Complexidade;
  public comentarios?: Comentario[];
  public certificado?: Certificado;
  public relatorioDeConclusao?: RelatorioDeConclusao;
  public anexos?: Anexo[];
  public contestacao?: Contestacao;
  public contestacaoCargaHoraria?: ContestacaoCargaHoraria;
  public status: string = ""; 

  constructor(
    id?: number,
    nome?: string,
    descricao?: string,
    dataCriacao?: Date,
    dataLimiteCandidatura?: Date,
    dataConclusao?: Date,
    projeto?: Projeto,
    autor?: Usuario,
    executor?: Usuario,
    competencia?: Competencia,
    complexidade?: Complexidade,
    comentarios?: Comentario[],
    certificado?: Certificado,
    relatorioDeConclusao?: RelatorioDeConclusao,
    anexos?: Anexo[],
    contestacao?: Contestacao,
    contestacaoCargaHoraria?: ContestacaoCargaHoraria,
    status?: string
  ) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (descricao) this.descricao = descricao;
    if (dataCriacao) this.dataCriacao = dataCriacao;
    if (dataLimiteCandidatura) this.dataLimiteCandidatura = dataLimiteCandidatura;
    if (dataConclusao) this.dataConclusao = dataConclusao;
    if (projeto) this.projeto = projeto;
    if (autor) this.autor = autor;
    if (executor) this.executor = executor;
    if (competencia) this.competencia = competencia;
    if (complexidade) this.complexidade = complexidade;
    if (comentarios) this.comentarios = comentarios;
    if (certificado) this.certificado = certificado;
    if (relatorioDeConclusao) this.relatorioDeConclusao = relatorioDeConclusao;
    if (anexos) this.anexos = anexos;
    if (contestacao) this.contestacao = contestacao;
    if (contestacaoCargaHoraria) this.contestacaoCargaHoraria = contestacaoCargaHoraria;
    if (status) this.status = status;
  }
}
