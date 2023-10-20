import { Competencia } from "./competencia.model";
import { Coordenador } from "./coordenador.model";

export class Graduacao {
  public id!: number;
  public nome: string = "";
  public coordenador!: Coordenador;
  public competencias!: Competencia[];

  constructor(id?: number, nome?: string, coordenador?: Coordenador, competencias?: Competencia[]) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (coordenador) this.coordenador = coordenador;
    if (competencias) this.competencias = competencias;
  }
}
