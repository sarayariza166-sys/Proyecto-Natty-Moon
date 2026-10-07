import { apiFetch } from '../api/httpClient';
import { DireccionInput, DireccionResponse } from '../../Domain/entities/Direccion';

export const DireccionService = {

  // GET /api/direcciones/mias
  async misDirecciones(token: string): Promise<DireccionResponse[]> {
    return await apiFetch<DireccionResponse[]>('/api/direcciones/mias', { token });
  },

  // POST /api/direcciones
  async crear(input: DireccionInput, token: string): Promise<DireccionResponse> {
    return await apiFetch<DireccionResponse>('/api/direcciones', {
      method: 'POST',
      body: input,
      token,
    });
  },

  // PUT /api/direcciones/{id}
  async actualizar(id: number, input: DireccionInput, token: string): Promise<DireccionResponse> {
    return await apiFetch<DireccionResponse>(`/api/direcciones/${id}`, {
      method: 'PUT',
      body: input,
      token,
    });
  },

  // DELETE /api/direcciones/{id}
  async eliminar(id: number, token: string): Promise<void> {
    await apiFetch<void>(`/api/direcciones/${id}`, { method: 'DELETE', token });
  },
};
