import { apiFetch } from '../api/httpClient';
import {
  Carrito,
  DetalleCarritoResponse,
  mapDetalleCarrito,
} from '../../Domain/entities/Carrito';

export const CarritoService = {

  // POST /api/carrito/agregar
  async agregar(varianteId: number, cantidad: number, token: string): Promise<void> {
    await apiFetch('/api/carrito/agregar', {
      method: 'POST',
      body: { varianteId, cantidad },
      token,
    });
  },

  // GET /api/carrito/detalles
  async ver(token: string): Promise<Carrito> {
    const detalles = await apiFetch<DetalleCarritoResponse[]>('/api/carrito/detalles', { token });
    const productos = detalles.map(mapDetalleCarrito);
    const total = productos.reduce((sum, p) => sum + p.subtotal, 0);
    return { productos, total };
  },

  // PUT /api/carrito/detalle/{id}
  async actualizarCantidad(idDetalle: number, cantidad: number, token: string): Promise<void> {
    await apiFetch(`/api/carrito/detalle/${idDetalle}`, {
      method: 'PUT',
      body: { cantidad },
      token,
    });
  },

  // DELETE /api/carrito/detalle/{id}
  async eliminarProducto(idDetalle: number, token: string): Promise<void> {
    await apiFetch(`/api/carrito/detalle/${idDetalle}`, { method: 'DELETE', token });
  },

  // DELETE /api/carrito/vaciar
  async vaciar(token: string): Promise<void> {
    await apiFetch('/api/carrito/vaciar', { method: 'DELETE', token });
  },
};
