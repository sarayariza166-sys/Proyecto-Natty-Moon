import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { CuponService } from '../../../data/services/CuponService';
import { Cupon } from '../../../Domain/entities/Cupon';

export const useCuponesViewModel = () => {
  const { user } = useAuth();

  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await CuponService.listarActivos(user.token);
      setCupones(data);
    } catch (error) {
      console.log('Error al cargar cupones:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return { cupones, loading, user, reload: load };
};
