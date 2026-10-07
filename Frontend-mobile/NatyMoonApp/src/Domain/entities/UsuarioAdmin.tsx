export type UsuarioAdmin = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  activo: boolean;
  rol: {
    id: number;
    nombre: string; // 'ADMIN' | 'EMPLEADO' | 'USER'
  } | null;
};
