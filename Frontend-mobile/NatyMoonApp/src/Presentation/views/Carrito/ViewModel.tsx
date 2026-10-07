import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { CarritoService } from '../../../data/services/CarritoService';
import { DetalleCarrito } from '../../../Domain/entities/Carrito';

export const useCarritoViewModel = () => {

  const { user } = useAuth();

  const [items, setItems] = useState<DetalleCarrito[]>([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // CARGAR CARRITO DEL BACKEND
  // ==========================================

  const loadCarrito = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const carrito = await CarritoService.ver(user.token);
      setItems(carrito.productos);
    } catch (error) {
      // Si el usuario todavía no tiene carrito creado, el backend
      // responde con error y lo tratamos como "carrito vacío".
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadCarrito();
    }, [loadCarrito])
  );


  // ==========================================
  // ELIMINAR UN PRODUCTO DEL CARRITO
  // ==========================================

  const removeFromCart = async (idDetalle: number) => {
    if (!user) return;

    await CarritoService.eliminarProducto(idDetalle, user.token);
    setItems((current) =>
      current.filter((item) => item.idDetalle !== idDetalle)
    );
  };


  // ==========================================
  // CAMBIAR CANTIDAD
  // ==========================================

  const updateCantidad = async (idDetalle: number, cantidad: number) => {
    if (!user) return;

    await CarritoService.actualizarCantidad(idDetalle, cantidad, user.token);
    setItems((current) =>
      current.map((item) =>
        item.idDetalle === idDetalle
          ? { ...item, cantidad, subtotal: item.precioUnitario * cantidad }
          : item
      )
    );
  };


  // ==========================================
  // TOTALES
  // ==========================================

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
  const subtotal = items.reduce((total, item) => total + item.subtotal, 0);

  // Envío gratis a partir de $150.000
  const shipping = subtotal === 0 ? 0 : subtotal >= 150000 ? 0 : 9900;

  const total = subtotal + shipping;


  return {
    items,
    loading,
    removeFromCart,
    updateCantidad,
    totalItems,
    subtotal,
    shipping,
    total,
    reload: loadCarrito,
  };
};
