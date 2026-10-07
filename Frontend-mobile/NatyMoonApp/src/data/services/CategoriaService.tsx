import { apiFetch } from '../api/httpClient';
import { Categoria } from '../../Domain/entities/Categoria';

export const CategoriaService = {

  async listar(): Promise<Categoria[]> {
    return await apiFetch<Categoria[]>('/api/categorias');
  },

  async crear(nombre: string, descripcion: string, imagen: string, token: string): Promise<Categoria> {
    return await apiFetch<Categoria>('/api/categorias', {
      method: 'POST',
      body: { nombre, descripcion, imagen, activo: true },
      token,
    });
  },

  async actualizar(
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    token: string
  ): Promise<Categoria> {
    return await apiFetch<Categoria>(`/api/categorias/${id}`, {
      method: 'PUT',
      body: { nombre, descripcion, imagen, activo: true },
      token,
    });
  },

  async eliminar(id: number, token: string): Promise<void> {
    await apiFetch<void>(`/api/categorias/${id}`, {
      method: 'DELETE',
      token,
    });
  },
};
