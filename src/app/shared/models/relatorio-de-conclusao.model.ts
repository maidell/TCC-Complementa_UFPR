import { Anexo } from "./anexo.model";

export class RelatorioDeConclusao {
    public id!: number;
    public descricao!: string;
    public anexos!: Anexo[];

    constructor(
        id?: number,
        descricao?: string,
        anexos?: Anexo[]) {
        if (id) this.id = id;
        if (descricao) this.descricao = descricao;
        if (anexos) this.anexos = anexos;
    }
}
