import { apiFetch } from '../api/httpClient';
import { ImagenProductoResponse } from '../../Domain/entities/ImagenProducto';

import {
  Product,
  ProductoInput,
  ProductoResponse,
  VarianteProductoInput,
  VarianteProductoResponse,
  mapProducto,
} from '../../Domain/entities/Producto';

// El backend expone productos, variantes e imágenes como tablas separadas
// (sin JOIN). Este service las trae todas y las combina en memoria para
// que el resto de la app pueda seguir trabajando con un único objeto
// "Product" (como antes), sin tener que pensar en 3 llamadas distintas.
async function cargarTodoElCatalogo(): Promise<{
  productos: ProductoResponse[];
  variantes: VarianteProductoResponse[];
  imagenes: ImagenProductoResponse[];
}> {
  const [productos, variantes, imagenes] = await Promise.all([
    apiFetch<ProductoResponse[]>('/api/productos'),
    apiFetch<VarianteProductoResponse[]>('/api/variantes-producto'),
    apiFetch<ImagenProductoResponse[]>('/api/imagenes-producto'),
  ]);

  return { productos, variantes, imagenes };
}

function imagenPrincipalDe(
  productoId: number,
  imagenes: ImagenProductoResponse[]
): string {
  const delProducto = imagenes.filter((img) => img.producto.id === productoId);
  const principal = delProducto.find((img) => img.esPrincipal) ?? delProducto[0];
  return principal?.url ?? '';
}

export const ProductoService = {

  // Pública
  async listar(): Promise<Product[]> {
    const { productos, variantes, imagenes } = await cargarTodoElCatalogo();

    return productos
      .filter((p) => p.activo)
      .map((p) => mapProducto(p, variantes, imagenPrincipalDe(p.id, imagenes)));
  },

  async buscarPorId(id: number): Promise<Product> {
    const [producto, variantes, imagenes] = await Promise.all([
      apiFetch<ProductoResponse>(`/api/productos/${id}`),
      apiFetch<VarianteProductoResponse[]>('/api/variantes-producto'),
      apiFetch<ImagenProductoResponse[]>('/api/imagenes-producto'),
    ]);

    return mapProducto(producto, variantes, imagenPrincipalDe(id, imagenes));
  },

  // ADMIN
  async crear(input: ProductoInput, token: string): Promise<ProductoResponse> {
    return await apiFetch<ProductoResponse>('/api/productos', {
      method: 'POST',
      body: input,
      token,
    });
  },

  async actualizar(id: number, input: ProductoInput, token: string): Promise<ProductoResponse> {
    return await apiFetch<ProductoResponse>(`/api/productos/${id}`, {
      method: 'PUT',
      body: input,
      token,
    });
  },

  async eliminar(id: number, token: string): Promise<void> {
    await apiFetch<void>(`/api/productos/${id}`, { method: 'DELETE', token });
  },

  // ===== Variantes (talla / color / stock) =====

  async crearVariante(input: VarianteProductoInput, token: string): Promise<VarianteProductoResponse> {
    return await apiFetch<VarianteProductoResponse>('/api/variantes-producto', {
      method: 'POST',
      body: input,
      token,
    });
  },

  async actualizarVariante(
    id: number,
    input: VarianteProductoInput,
    token: string
  ): Promise<VarianteProductoResponse> {
    return await apiFetch<VarianteProductoResponse>(`/api/variantes-producto/${id}`, {
      method: 'PUT',
      body: input,
      token,
    });
  },

  async eliminarVariante(id: number, token: string): Promise<void> {
    await apiFetch<void>(`/api/variantes-producto/${id}`, { method: 'DELETE', token });
  },

  // ===== Imagen (una sola por producto, por simplicidad) =====

  async fijarImagen(productoId: number, url: string, token: string): Promise<void> {
    const imagenes = await apiFetch<ImagenProductoResponse[]>('/api/imagenes-producto');
    const existente = imagenes.find((img) => img.producto.id === productoId);

    if (existente) {
      await apiFetch(`/api/imagenes-producto/${existente.id}`, {
        method: 'PUT',
        body: { producto: { id: productoId }, url, esPrincipal: true, orden: 1 },
        token,
      });
    } else {
      await apiFetch('/api/imagenes-producto', {
        method: 'POST',
        body: { producto: { id: productoId }, url, esPrincipal: true, orden: 1 },
        token,
      });
    }
  },
};
