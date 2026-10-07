export const ESTADOS_ORDEN = [
  'PENDIENTE',
  'PAGADO',
  'EN_PREPARACION',
  'ENVIADO',
  'ENTREGADO',
  'CANCELADO',
] as const;

export type EstadoOrden = (typeof ESTADOS_ORDEN)[number];

export type OrdenCompraResponse = {
  id: number;
  usuario: { id: number; nombre: string; apellido: string; email: string };
  direccion: {
    id: number;
    destinatario: string;
    calle: string;
    ciudad: string;
  };
  cupon: { id: number; codigo: string } | null;
  subtotal: number;
  descuento: number;
  costoEnvio: number;
  total: number;
  estado: EstadoOrden;
  fechaCreacion: string;
  fechaActualizacion: string;
};

export type DetalleOrdenResponse = {
  id: number;
  orden: { id: number };
  variante: {
    id: number;
    talla: string;
    color: string;
    producto: { id: number; nombre: string };
  };
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
};

// Tipos "planos" usados en pantalla
export type DetalleOrden = {
  nombreProducto: string;
  talla: string;
  color: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
};

export type PagoResponse = {
  id: number;
  orden: { id: number };
  metodoPago: 'TARJETA' | 'PSE' | 'EFECTIVO' | 'TRANSFERENCIA' | 'NEQUI' | 'DAVIPLATA' | 'NU';
  monto: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  referenciaTransaccion: string | null;
  fechaPago: string;
} | null;

export type Orden = {
  id: number;
  estado: EstadoOrden;
  subtotal: number;
  descuento: number;
  costoEnvio: number;
  total: number;
  fechaCreacion: string;
  cuponAplicado: string | null;
  direccion: string;
  metodoPago: string | null;
  cliente: { nombre: string; apellido: string; email: string } | null;
  productos: DetalleOrden[];
};

export const mapOrden = (
  o: OrdenCompraResponse,
  detalles: DetalleOrdenResponse[] = [],
  pago: PagoResponse = null
): Orden => ({
  id: o.id,
  estado: o.estado,
  subtotal: o.subtotal,
  descuento: o.descuento,
  costoEnvio: o.costoEnvio,
  total: o.total,
  fechaCreacion: o.fechaCreacion,
  cuponAplicado: o.cupon?.codigo ?? null,
  direccion: o.direccion
    ? `${o.direccion.destinatario} — ${o.direccion.calle}, ${o.direccion.ciudad}`
    : '',
  metodoPago: pago?.metodoPago ?? null,
  cliente: o.usuario
    ? { nombre: o.usuario.nombre, apellido: o.usuario.apellido, email: o.usuario.email }
    : null,
  productos: detalles
    .filter((d) => d.orden.id === o.id)
    .map((d) => ({
      nombreProducto: d.variante.producto?.nombre ?? 'Producto',
      talla: d.variante.talla,
      color: d.variante.color,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal,
    })),
});
