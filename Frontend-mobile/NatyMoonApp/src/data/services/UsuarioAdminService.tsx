import { apiFetch } from '../api/httpClient';
import { UsuarioAdmin } from '../../Domain/entities/UsuarioAdmin';

export type CrearStaffInput = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  rolNombre: 'ADMIN' | 'EMPLEADO';
};

export const UsuarioAdminService = {

  // GET /api/usuarios (ADMIN)
  async listar(token: string): Promise<UsuarioAdmin[]> {
    return await apiFetch<UsuarioAdmin[]>('/api/usuarios', { token });
  },

  // PATCH /api/usuarios/{id}/estado  body: { activo: boolean }
  async cambiarEstado(id: number, activo: boolean, token: string): Promise<UsuarioAdmin> {
    return await apiFetch<UsuarioAdmin>(`/api/usuarios/${id}/estado`, {
      method: 'PATCH',
      body: { activo },
      token,
    });
  },

  // DELETE /api/usuarios/{id}
  async eliminar(id: number, token: string): Promise<void> {
    await apiFetch<void>(`/api/usuarios/${id}`, { method: 'DELETE', token });
  },

  // POST /api/usuarios/staff (crea ADMIN o EMPLEADO con contraseña real)
  async crearStaff(input: CrearStaffInput, token: string): Promise<UsuarioAdmin> {
    return await apiFetch<UsuarioAdmin>('/api/usuarios/staff', {
      method: 'POST',
      body: input,
      token,
    });
  },
};
