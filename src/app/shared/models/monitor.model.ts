import { Aluno } from "./aluno.model";
import { Graduacao } from "./graduacao.model";

export class Monitor extends Aluno {

    constructor(
        id?: number,
        nome?: string,
        email?: string,
        telefone?: string,
        senha?: string,
        papel?: string,
        grr?: string,
        //graduacao?: Graduacao
        ) {
        super(id, nome, email, telefone, senha, papel, grr
            //, graduacao
            );
    }

}
