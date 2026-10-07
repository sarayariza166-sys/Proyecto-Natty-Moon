import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { DireccionService } from '../../../data/services/DireccionService';
import { OrdenService, CrearOrdenInput } from '../../../data/services/OrdenService';
import { CarritoService } from '../../../data/services/CarritoService';
import { DireccionResponse, DireccionInput } from '../../../Domain/entities/Direccion';

export const METODOS_PAGO = [
  { valor: 'NEQUI' as const, label: 'Nequi', icon: 'phone-portrait-outline' },
  { valor: 'DAVIPLATA' as const, label: 'Daviplata', icon: 'wallet-outline' },
  { valor: 'NU' as const, label: 'Nu', icon: 'card-outline' },
];

export const NUMERO_PAGO_MOVIL = '31930557803';

const EMPTY_DIRECCION = {
  destinatario: '',
  telefonoContacto: '',
  calle: '',
  ciudad: '',
};

export const useCheckoutViewModel = (subtotal: number) => {
  const { user } = useAuth();

  const [direcciones, setDirecciones] = useState<DireccionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDireccionId, setSelectedDireccionId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_DIRECCION);
  const [savingDireccion, setSavingDireccion] = useState(false);

  const [metodoPago, setMetodoPago] = useState<CrearOrdenInput['metodoPago']>('NEQUI');
  const [codigoCupon, setCodigoCupon] = useState('');
  const [confirming, setConfirming] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await DireccionService.misDirecciones(user.token);
      setDirecciones(data);

      if (data.length > 0) {
        const principal = data.find((d) => d.esPrincipal) ?? data[0];
        setSelectedDireccionId(principal.id);
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.log('Error al cargar direcciones:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  const guardarDireccion = async () => {
    if (!user) return;

    if (!form.destinatario.trim() || !form.calle.trim() || !form.ciudad.trim()) {
      Alert.alert('NatyMoon', 'Completa destinatario, calle y ciudad.');
      return;
    }

    if (!SOLO_LETRAS.test(form.destinatario.trim())) {
      Alert.alert('NatyMoon', 'El nombre de quien recibe no debe contener números.');
      return;
    }

    if (!SOLO_LETRAS.test(form.ciudad.trim())) {
      Alert.alert('NatyMoon', 'La ciudad no debe contener números.');
      return;
    }

    if (form.telefonoContacto.trim() && form.telefonoContacto.trim().length !== 10) {
      Alert.alert('NatyMoon', 'El teléfono debe tener 10 números.');
      return;
    }

    setSavingDireccion(true);

    try {
      const input: DireccionInput = {
        destinatario: form.destinatario.trim(),
        telefonoContacto: form.telefonoContacto.trim() || undefined,
        calle: form.calle.trim(),
        ciudad: form.ciudad.trim(),
        esPrincipal: direcciones.length === 0,
      };

      const nueva = await DireccionService.crear(input, user.token);

      setDirecciones((current) => [...current, nueva]);
      setSelectedDireccionId(nueva.id);
      setShowForm(false);
      setForm(EMPTY_DIRECCION);
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo guardar la dirección.');
    } finally {
      setSavingDireccion(false);
    }
  };

  const confirmarCompra = async (onSuccess: () => void) => {
    if (!user) return;

    if (!selectedDireccionId) {
      Alert.alert('NatyMoon', 'Selecciona o agrega una dirección de envío.');
      return;
    }

    setConfirming(true);

    try {
      await OrdenService.crear(
        {
          direccionId: selectedDireccionId,
          metodoPago,
          codigoCupon: codigoCupon.trim() || undefined,
        },
        user.token
      );

      onSuccess();
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo completar la compra.');
    } finally {
      setConfirming(false);
    }
  };

  return {
    direcciones,
    loading,
    selectedDireccionId,
    setSelectedDireccionId,
    showForm,
    setShowForm,
    form,
    setForm,
    savingDireccion,
    guardarDireccion,
    metodoPago,
    setMetodoPago,
    codigoCupon,
    setCodigoCupon,
    confirming,
    confirmarCompra,
  };
};
