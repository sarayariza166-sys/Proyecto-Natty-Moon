import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { OrdenService } from '../../../data/services/OrdenService';
import { Orden } from '../../../Domain/entities/Orden';

export const usePedidosViewModel = () => {

  const { user } = useAuth();

  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setOrdenes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await OrdenService.misOrdenes(user.token);
      setOrdenes(data);
    } catch (error) {
      console.log('Error al cargar pedidos:', error);
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return {
    ordenes,
    loading,
    user,
    reload: load,
  };
};
