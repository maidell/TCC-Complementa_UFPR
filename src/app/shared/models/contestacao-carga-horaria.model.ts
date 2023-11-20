import { Contestacao } from "./contestacao.model";

export class ContestacaoCargaHoraria extends Contestacao {
    public cargaHorariaOriginal!: number;
	public cargaHorariaNova!: number;

    constructor(
        id?: number,
        descricao?: string,
        cargaHorariaOriginal?: number,
        cargaHorariaNova?: number
      ) {
        super(id, descricao);
        if (cargaHorariaOriginal) this.cargaHorariaOriginal = cargaHorariaOriginal;
        if (cargaHorariaNova) this.cargaHorariaNova = cargaHorariaNova;
      }
}
