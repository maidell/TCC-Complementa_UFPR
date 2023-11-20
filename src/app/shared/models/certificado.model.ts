export class Certificado {
    public id!: number;

    constructor(
        id?: number) {
        if (id) this.id = id;
    }

}
