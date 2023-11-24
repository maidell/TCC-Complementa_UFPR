import { Competencia } from "./competencia.model";
import { Complexidade } from "./complexidade.model";
import { Coordenador } from "./coordenador.model";
import { ServidorCoordenador } from "./servidor-coordenador.model";

export class Graduacao {
  public id!: number;
  public nome!: string;
  public coordenador!: Coordenador;
  public competencias!: Competencia[];
  public complexidades!: Complexidade[];
  public servidoresCoordenadores!: ServidorCoordenador[];

  constructor(id?: number, nome?: string, coordenador?: Coordenador, competencias?: Competencia[], complexidades?: Complexidade[], servidoresCoordenadores?: ServidorCoordenador[]) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (coordenador) this.coordenador = coordenador;
    if (competencias) this.competencias = competencias;
    if (complexidades) this.complexidades = complexidades;
    if (servidoresCoordenadores) this.servidoresCoordenadores = servidoresCoordenadores;
  }
}
