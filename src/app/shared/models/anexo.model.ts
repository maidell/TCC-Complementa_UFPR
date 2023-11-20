import { Atividade } from "./atividade.model";
import { RelatorioDeConclusao } from "./relatorio-de-conclusao.model";

export class Anexo {
    public id!: number;
    public fileName!: string;
    public filePath!: string;
    public atividade!: Atividade;
    public relatorioDeConclusao!: RelatorioDeConclusao; 

    constructor(
        id?: number,
        fileName?: string,
        filePath?: string,
        atividade?: Atividade,
        relatorioDeConclusao?: RelatorioDeConclusao) {
        if(id) this.id = id;
        if(fileName) this.fileName = fileName;
        if(filePath) this.filePath = filePath;
        if(atividade) this.atividade = atividade;
        if(relatorioDeConclusao) this.relatorioDeConclusao = relatorioDeConclusao;
    }

}
