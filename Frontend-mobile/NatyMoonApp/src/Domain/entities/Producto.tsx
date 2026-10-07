// ==========================================
// Formas que devuelve/espera el backend v4
// ==========================================

export const GENEROS = ['HOMBRE', 'MUJER', 'UNISEX', 'NINO', 'NINA'] as const;
export type Genero = (typeof GENEROS)[number];

export type ProductoResponse = {
  id: number;
  nombre: string;
  descripcion: string | null;
  categoria: { id: number; nombre: string } | null;
  precioBase: number;
  precioOferta: number | null;
  genero: Genero | null;
  material: string | null;
  activo: boolean;
};

// Lo que espera el backend al crear/editar (entidad Producto cruda:
// la categoría va como objeto anidado { id }, no como "idCategoria")
export type ProductoInput = {
  nombre: string;
  descripcion: string;
  categoria: { id: number };
  precioBase: number;
  precioOferta: number | null;
  genero: Genero | null;
  material: string;
  activo: boolean;
};

export type VarianteProductoResponse = {
  id: number;
  producto: { id: number; nombre?: string };
  sku: string;
  talla: string;
  color: string;
  stock: number;
  precioAdicional: number;
  activo: boolean;
};

export type VarianteProductoInput = {
  producto: { id: number };
  sku: string;
  talla: string;
  color: string;
  stock: number;
  precioAdicional: number;
  activo: boolean;
};

// ==========================================
// Tipo usado en toda la parte visual de la app.
// "variantes" y "image" se arman en ProductoService combinando
// /api/productos + /api/variantes-producto + /api/imagenes-producto,
// ya que el backend los expone como tablas separadas.
// ==========================================

export type ProductVariant = {
  id: number;
  talla: string;
  color: string;
  stock: number;
  precioAdicional: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  categoryId: number | null;
  price: number; // precioOferta si existe, si no precioBase
  basePrice: number;
  offerPrice: number | null;
  genero: Genero | null;
  material: string;
  variantes: ProductVariant[];
  stock: number; // suma del stock de todas las variantes, para mostrar "hay/no hay"
};

export const mapProducto = (
  p: ProductoResponse,
  variantes: VarianteProductoResponse[] = [],
  imagenUrl: string = ''
): Product => {
  const variantesDelProducto = variantes
    .filter((v) => v.producto.id === p.id && v.activo)
    .map((v) => ({
      id: v.id,
      talla: v.talla,
      color: v.color,
      stock: v.stock,
      precioAdicional: v.precioAdicional,
    }));

  return {
    id: p.id,
    name: p.nombre,
    description: p.descripcion ?? '',
    image: imagenUrl,
    category: p.categoria?.nombre ?? '',
    categoryId: p.categoria?.id ?? null,
    price: p.precioOferta ?? p.precioBase,
    basePrice: p.precioBase,
    offerPrice: p.precioOferta,
    genero: p.genero,
    material: p.material ?? '',
    variantes: variantesDelProducto,
    stock: variantesDelProducto.reduce((sum, v) => sum + v.stock, 0),
  };
};
