export class Certificado {
    public id!: number;
    public nome!: string;
    public orientador!: string;
    public projeto!: string;
    public horas! : number;
    public hash! : string;

    constructor(
        id?: number,
        nome?: string,
        orientador?: string,
        projeto?: string,
        horas? :number,
        hash? :string){
        if (id) this.id = id;
        if (nome) this.nome = nome;
        if (orientador) this.orientador = orientador;
        if (projeto) this.projeto = projeto;
        if (horas) this.horas = horas;
        if (hash) this.hash = hash;
    }

}
