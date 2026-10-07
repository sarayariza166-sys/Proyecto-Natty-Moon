import { apiFetch } from '../api/httpClient';
import {
  DetalleOrdenResponse,
  Orden,
  OrdenCompraResponse,
  PagoResponse,
  mapOrden,
} from '../../Domain/entities/Orden';

const cargarDetallesYPago = async (
  ordenId: number,
  token: string
): Promise<[DetalleOrdenResponse[], PagoResponse]> => {
  const [detallesResult, pagoResult] = await Promise.allSettled([
    apiFetch<DetalleOrdenResponse[]>(`/api/ordenes/${ordenId}/detalles`, { token }),
    apiFetch<PagoResponse>(`/api/ordenes/${ordenId}/pago`, { token }),
  ]);

  const detalles = detallesResult.status === 'fulfilled' ? detallesResult.value : [];
  const pago = pagoResult.status === 'fulfilled' ? pagoResult.value : null;

  return [detalles, pago];
};

export const OrdenAdminService = {

  async verTodasLasOrdenes(token: string): Promise<Orden[]> {
    const ordenes = await apiFetch<OrdenCompraResponse[]>('/api/ordenes/todas', { token });

    const extras = await Promise.all(
      ordenes.map((o) => cargarDetallesYPago(o.id, token))
    );

    return ordenes.map((o, i) => mapOrden(o, extras[i][0], extras[i][1]));
  },

  async cambiarEstado(id: number, estado: string, token: string, comentario?: string): Promise<OrdenCompraResponse> {
    return await apiFetch<OrdenCompraResponse>(`/api/ordenes/${id}/estado`, {
      method: 'PUT',
      body: { estado, comentario },
      token,
    });
  },
};
