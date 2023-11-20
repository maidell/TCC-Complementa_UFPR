export class Complexidade {
    public id!: number;
    public nome: string = "";
    public cargaHorariaMinima!: number;
    public cargaHorariaMaxima!: number;

    constructor(
        id?: number,
        nome?: string,
        cargaHorariaMinima?: number,
        cargaHorariaMaxima?: number
      ) {
        if (id) this.id = id;
        if (nome) this.nome = nome;
        if (cargaHorariaMinima) this.cargaHorariaMinima = cargaHorariaMinima;
        if (cargaHorariaMaxima) this.cargaHorariaMaxima = cargaHorariaMaxima;
      }

}
