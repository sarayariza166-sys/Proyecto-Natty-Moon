import { apiFetch } from '../api/httpClient';
import {
  DetalleOrdenResponse,
  Orden,
  OrdenCompraResponse,
  PagoResponse,
  mapOrden,
} from '../../Domain/entities/Orden';

export type CrearOrdenInput = {
  direccionId: number;
  metodoPago: 'TARJETA' | 'PSE' | 'EFECTIVO' | 'TRANSFERENCIA' | 'NEQUI' | 'DAVIPLATA' | 'NU';
  codigoCupon?: string;
};

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

export const OrdenService = {

  async crear(input: CrearOrdenInput, token: string): Promise<Orden> {
    const orden = await apiFetch<OrdenCompraResponse>('/api/ordenes/crear', {
      method: 'POST',
      body: input,
      token,
    });

    const [detalles, pago] = await cargarDetallesYPago(orden.id, token);

    return mapOrden(orden, detalles, pago);
  },

  async misOrdenes(token: string): Promise<Orden[]> {
    const ordenes = await apiFetch<OrdenCompraResponse[]>('/api/ordenes/mias', { token });

    const extras = await Promise.all(
      ordenes.map((o) => cargarDetallesYPago(o.id, token))
    );

    return ordenes.map((o, i) => mapOrden(o, extras[i][0], extras[i][1]));
  },
};
