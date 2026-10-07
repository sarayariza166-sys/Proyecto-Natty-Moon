import { apiFetch } from '../api/httpClient';
import { CrearNovedadInput, EstadoNovedad, Novedad } from '../../Domain/entities/Novedad';

export const NovedadService = {

  // Cliente: GET /api/novedades/mias
  async misNovedades(token: string): Promise<Novedad[]> {
    return await apiFetch<Novedad[]>('/api/novedades/mias', { token });
  },

  // Cliente: POST /api/novedades/mias
  async crear(input: CrearNovedadInput, token: string): Promise<Novedad> {
    return await apiFetch<Novedad>('/api/novedades/mias', {
      method: 'POST',
      body: input,
      token,
    });
  },

  // Staff: GET /api/novedades
  async listarTodas(token: string): Promise<Novedad[]> {
    return await apiFetch<Novedad[]>('/api/novedades', { token });
  },

  // Staff: PUT /api/novedades/{id}/responder
  async responder(id: number, estado: EstadoNovedad, respuesta: string, token: string): Promise<Novedad> {
    return await apiFetch<Novedad>(`/api/novedades/${id}/responder`, {
      method: 'PUT',
      body: { estado, respuesta },
      token,
    });
  },
};
