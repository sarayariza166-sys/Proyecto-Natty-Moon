import { LoginResponse } from '../../Domain/entities/LoginResponse';
import { AuthRepository } from '../../Domain/repositories/AuthRepository';
import { apiFetch } from '../api/httpClient';

// IMPORTANTE: el backend v4 espera "password" (no "contrasena") y, para
// registrarse, "nombre" + "apellido" por separado. El registro público
// SIEMPRE crea un usuario con rol USER (el backend lo fuerza así); crear
// cuentas ADMIN/EMPLEADO se hace aparte, desde el panel de administración.
export class AuthRepositoryImpl implements AuthRepository {

    async register(
        nombre: string,
        apellido: string,
        email: string,
        password: string,
        telefono?: string
    ): Promise<LoginResponse> {

        // El backend ya deja al usuario logueado (devuelve el token),
        // así el registro y el login quedan en un solo paso.
        return apiFetch<LoginResponse>('/api/auth/register', {
            method: 'POST',
            body: { nombre, apellido, email, password, telefono },
        });
    }

    async login(
        email: string,
        password: string
    ): Promise<LoginResponse> {

        return apiFetch<LoginResponse>('/api/auth/login', {
            method: 'POST',
            body: { email, password },
        });
    }
}
