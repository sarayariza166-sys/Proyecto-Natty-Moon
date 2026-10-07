// Coincide con el LoginResponse que devuelve el backend (AuthController).
// El rol viene como texto simple: 'ADMIN' | 'EMPLEADO' | 'USER'
export interface LoginResponse {
    id: number;
    token: string;
    email: string;
    rol: string;
}
