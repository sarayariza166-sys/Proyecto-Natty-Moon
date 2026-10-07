export const TIPOS_DESCUENTO = ['PORCENTAJE', 'MONTO_FIJO'] as const;
export type TipoDescuento = (typeof TIPOS_DESCUENTO)[number];

export type Cupon = {
  id: number;
  codigo: string;
  tipoDescuento: TipoDescuento;
  valor: number;
  montoMinimo: number;
  fechaInicio: string; // ISO
  fechaFin: string; // ISO
  usoMaximo: number | null;
  usosActuales: number;
  activo: boolean;
};

export type CuponInput = {
  codigo: string;
  tipoDescuento: TipoDescuento;
  valor: number;
  montoMinimo: number;
  fechaInicio: string;
  fechaFin: string;
  usoMaximo: number | null;
  activo: boolean;
};
