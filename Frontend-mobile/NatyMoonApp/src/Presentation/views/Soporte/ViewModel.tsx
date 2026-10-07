import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { NovedadService } from '../../../data/services/NovedadService';
import { Novedad } from '../../../Domain/entities/Novedad';

export const useSoporteViewModel = () => {
  const { user } = useAuth();

  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await NovedadService.misNovedades(user.token);
      setNovedades([...data].sort((a, b) => b.id - a.id));
    } catch (error) {
      console.log('Error al cargar reportes:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const openForm = () => {
    setAsunto('');
    setDescripcion('');
    setModalVisible(true);
  };

  const enviar = async () => {
    if (!user) return;

    if (!asunto.trim() || !descripcion.trim()) {
      Alert.alert('NatyMoon', 'Completa el asunto y la descripción.');
      return;
    }

    setSaving(true);

    try {
      await NovedadService.crear(
        { asunto: asunto.trim(), descripcion: descripcion.trim() },
        user.token
      );

      setModalVisible(false);
      await load();
      Alert.alert('NatyMoon', 'Tu reporte fue enviado. Te responderemos pronto.');
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo enviar el reporte.');
    } finally {
      setSaving(false);
    }
  };

  return {
    user,
    novedades,
    loading,
    reload: load,
    modalVisible,
    setModalVisible,
    asunto,
    setAsunto,
    descripcion,
    setDescripcion,
    saving,
    openForm,
    enviar,
  };
};
