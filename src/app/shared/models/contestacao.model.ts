export class Contestacao {
    public id!: number;
    public descricao: string = "";
    public status!: string;

    constructor(
        id?: number,
        descricao?: string) {
        if(id) this.id = id;
        if(descricao) this.descricao = descricao;
    }
}
