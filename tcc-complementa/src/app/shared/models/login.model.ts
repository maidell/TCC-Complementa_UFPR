export class Login {
    public email: string = "";
    public senha: string = "";

    constructor(
        email?: string,
        senha?: string) {
        if (email) this.email = email;
        if (senha) this.senha = senha;
    }
}

