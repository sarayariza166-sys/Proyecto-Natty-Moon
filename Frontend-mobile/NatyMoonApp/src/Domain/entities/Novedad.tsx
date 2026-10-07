export const ESTADOS_NOVEDAD = ['ABIERTA', 'EN_PROCESO', 'RESUELTA'] as const;
export type EstadoNovedad = (typeof ESTADOS_NOVEDAD)[number];

export type Novedad = {
  id: number;
  usuario: { id: number; nombre: string; apellido: string; email: string };
  orden: { id: number } | null;
  asunto: string;
  descripcion: string;
  estado: EstadoNovedad;
  respuesta: string | null;
  fechaCreacion: string;
  fechaActualizacion: string;
};

export type CrearNovedadInput = {
  asunto: string;
  descripcion: string;
  ordenId?: number;
};
