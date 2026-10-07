import { LoginResponse } from '../entities/LoginResponse';

export interface AuthRepository {
    register(
        nombre: string,
        apellido: string,
        email: string,
        password: string,
        telefono?: string
    ): Promise<LoginResponse>;

    login(
        email: string,
        password: string
    ): Promise<LoginResponse>;
}
