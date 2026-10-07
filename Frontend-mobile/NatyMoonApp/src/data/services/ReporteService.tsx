import { apiFetch } from '../api/httpClient';

export type ResumenReporte = {
  totalVentas: number;
  totalPedidos: number;
  pedidosPorEstado: Record<string, number>;
  ventasPorMetodoPago: Record<string, number>;
  topProductos: {
    nombreProducto: string;
    cantidadVendida: number;
    ingresos: number;
  }[];
};

export const ReporteService = {

  // GET /api/reportes/resumen (ADMIN/EMPLEADO)
  async obtenerResumen(token: string): Promise<ResumenReporte> {
    return await apiFetch<ResumenReporte>('/api/reportes/resumen', { token });
  },
};
