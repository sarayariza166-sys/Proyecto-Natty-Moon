import { LoginResponse } from '../../entities/LoginResponse';
import { AuthRepository } from '../../repositories/AuthRepository';

export class RegisterAuthUseCase {

    constructor(
        private authRepository: AuthRepository
    ) {}

    async execute(
        nombre: string,
        apellido: string,
        email: string,
        password: string,
        telefono?: string
    ): Promise<LoginResponse> {

        return await this.authRepository.register(
            nombre,
            apellido,
            email,
            password,
            telefono
        );
    }
}
