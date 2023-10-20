import { Usuario } from '../shared'

export interface ApiResponseLogin {
    auth: boolean;
    token: string;
    data: Usuario;
}
