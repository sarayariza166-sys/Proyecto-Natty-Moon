export interface User {
    id?: number;
    nombre: string;
    email: string;
    contrasena?: string;
    estado?: string;
    fechaCreacion?: string;
    rol?: {
        id: number;
        descripcion: string;
    };
}