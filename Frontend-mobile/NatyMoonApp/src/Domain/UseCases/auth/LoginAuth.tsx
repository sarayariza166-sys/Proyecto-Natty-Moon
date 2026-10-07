import { LoginResponse } from '../../entities/LoginResponse';
import { AuthRepository } from '../../repositories/AuthRepository';

export class LoginAuthUseCase {

    constructor(
        private authRepository: AuthRepository
    ) {}

    async execute(
        email: string,
        contrasena: string
    ): Promise<LoginResponse> {

        return await this.authRepository.login(
            email,
            contrasena
        );
    }
}
