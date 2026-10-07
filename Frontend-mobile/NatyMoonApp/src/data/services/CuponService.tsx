import { apiFetch } from '../api/httpClient';
import { Cupon, CuponInput } from '../../Domain/entities/Cupon';

export const CuponService = {

  // Cualquier autenticado - GET /api/cupones/activos
  async listarActivos(token: string): Promise<Cupon[]> {
    return await apiFetch<Cupon[]>('/api/cupones/activos', { token });
  },

  // ADMIN - GET /api/cupones
  async listarTodos(token: string): Promise<Cupon[]> {
    return await apiFetch<Cupon[]>('/api/cupones', { token });
  },

  // ADMIN - POST /api/cupones
  async crear(input: CuponInput, token: string): Promise<Cupon> {
    return await apiFetch<Cupon>('/api/cupones', {
      method: 'POST',
      body: input,
      token,
    });
  },

  // ADMIN - PUT /api/cupones/{id}
  async actualizar(id: number, input: CuponInput, token: string): Promise<Cupon> {
    return await apiFetch<Cupon>(`/api/cupones/${id}`, {
      method: 'PUT',
      body: input,
      token,
    });
  },

  // ADMIN - DELETE /api/cupones/{id}
  async eliminar(id: number, token: string): Promise<void> {
    await apiFetch<void>(`/api/cupones/${id}`, { method: 'DELETE', token });
  },
};
