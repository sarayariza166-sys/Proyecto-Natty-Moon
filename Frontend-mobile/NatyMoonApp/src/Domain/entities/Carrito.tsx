export type DetalleCarritoResponse = {
  id: number;
  carrito: { id: number };
  variante: {
    id: number;
    talla: string;
    color: string;
    stock: number;
    producto: { id: number; nombre: string };
  };
  cantidad: number;
  precioUnitario: number;
};

export type CarritoCompraResponse = {
  id: number;
  usuario: { id: number };
  estado: string;
};

// Tipo usado en la pantalla de Carrito
export type DetalleCarrito = {
  idDetalle: number;
  idVariante: number;
  nombreProducto: string;
  talla: string;
  color: string;
  stockDisponible: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
};

export type Carrito = {
  productos: DetalleCarrito[];
  total: number;
};

export const mapDetalleCarrito = (d: DetalleCarritoResponse): DetalleCarrito => ({
  idDetalle: d.id,
  idVariante: d.variante.id,
  nombreProducto: d.variante.producto?.nombre ?? 'Producto',
  talla: d.variante.talla,
  color: d.variante.color,
  stockDisponible: d.variante.stock,
  cantidad: d.cantidad,
  precioUnitario: d.precioUnitario,
  subtotal: d.precioUnitario * d.cantidad,
});
