import React, { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { CuponService } from '../../../data/services/CuponService';
import { Cupon, CuponInput, TIPOS_DESCUENTO, TipoDescuento } from '../../../Domain/entities/Cupon';

import { adminStyles, ADMIN_COLORS } from './styles';


const EMPTY_FORM = {
  codigo: '',
  valor: '',
  montoMinimo: '',
  fechaInicio: '',
  fechaFin: '',
  usoMaximo: '',
};

const formatPrice = (price: number) => `$${Number(price).toLocaleString('es-CO')}`;

// yyyy-mm-dd -> LocalDateTime que el backend espera (inicio/fin del día)
const aFechaInicioISO = (yyyyMMdd: string) => `${yyyyMMdd}T00:00:00`;
const aFechaFinISO = (yyyyMMdd: string) => `${yyyyMMdd}T23:59:59`;


const GestionCupones = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tipoDescuento, setTipoDescuento] = useState<TipoDescuento>('PORCENTAJE');
  const [activo, setActivo] = useState(true);
  const [saving, setSaving] = useState(false);


  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await CuponService.listarTodos(user.token);
      setCupones([...data].sort((a, b) => b.id - a.id));
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


  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setTipoDescuento('PORCENTAJE');
    setActivo(true);
    setModalVisible(true);
  };

  const openEdit = (cupon: Cupon) => {
    setEditingId(cupon.id);
    setForm({
      codigo: cupon.codigo,
      valor: String(cupon.valor),
      montoMinimo: String(cupon.montoMinimo ?? 0),
      fechaInicio: cupon.fechaInicio?.slice(0, 10) ?? '',
      fechaFin: cupon.fechaFin?.slice(0, 10) ?? '',
      usoMaximo: cupon.usoMaximo != null ? String(cupon.usoMaximo) : '',
    });
    setTipoDescuento(cupon.tipoDescuento);
    setActivo(cupon.activo);
    setModalVisible(true);
  };


  const handleSave = async () => {
    if (!user) return;

    if (!form.codigo.trim() || !form.valor || !form.fechaInicio || !form.fechaFin) {
      Alert.alert('NatyMoon', 'Completa código, valor, fecha de inicio y fecha de fin.');
      return;
    }

    const input: CuponInput = {
      codigo: form.codigo.trim().toUpperCase(),
      tipoDescuento,
      valor: Number(form.valor),
      montoMinimo: form.montoMinimo ? Number(form.montoMinimo) : 0,
      fechaInicio: aFechaInicioISO(form.fechaInicio),
      fechaFin: aFechaFinISO(form.fechaFin),
      usoMaximo: form.usoMaximo ? Number(form.usoMaximo) : null,
      activo,
    };

    setSaving(true);

    try {
      if (editingId) {
        await CuponService.actualizar(editingId, input, user.token);
      } else {
        await CuponService.crear(input, user.token);
      }

      setModalVisible(false);
      await load();
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo guardar el cupón.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (cupon: Cupon) => {
    Alert.alert(
      'Eliminar cupón',
      `¿Eliminar el cupón "${cupon.codigo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            try {
              await CuponService.eliminar(cupon.id, user.token);
              await load();
            } catch (error: any) {
              Alert.alert('NatyMoon', error?.message || 'No se pudo eliminar.');
            }
          },
        },
      ]
    );
  };


  return (
    <View style={adminStyles.container}>

      <View style={adminStyles.header}>

        <TouchableOpacity
          style={adminStyles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu-outline" size={27} color={ADMIN_COLORS.primaryDark} />
        </TouchableOpacity>

        <Text style={adminStyles.headerTitle}>Cupones</Text>

        <View style={adminStyles.headerRight} />

      </View>


      {loading ? (

        <View style={adminStyles.emptyContainer}>
          <ActivityIndicator size="large" color={ADMIN_COLORS.primary} />
        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={adminStyles.content}
        >

          {cupones.length === 0 && (
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="pricetag-outline" size={40} color={ADMIN_COLORS.textLight} />
              <Text style={adminStyles.emptyText}>
                Todavía no hay cupones. Agrega el primero con el botón +.
              </Text>
            </View>
          )}

          {cupones.map((cupon) => (

            <View key={cupon.id} style={adminStyles.card}>

              <View style={adminStyles.cardImage}>
                <Ionicons name="pricetag-outline" size={24} color="#B79ED0" />
              </View>

              <View style={adminStyles.cardInfo}>

                <Text style={adminStyles.cardTitle} numberOfLines={1}>
                  {cupon.codigo}
                </Text>

                <Text style={adminStyles.cardSubtitle}>
                  {cupon.tipoDescuento === 'PORCENTAJE'
                    ? `${cupon.valor}% de descuento`
                    : `${formatPrice(cupon.valor)} de descuento`}
                  {cupon.montoMinimo > 0 ? ` · mín. ${formatPrice(cupon.montoMinimo)}` : ''}
                </Text>

                <Text style={adminStyles.cardSubtitle}>
                  Usos: {cupon.usosActuales}{cupon.usoMaximo != null ? ` / ${cupon.usoMaximo}` : ' (sin límite)'}
                </Text>

                <View
                  style={[
                    adminStyles.badge,
                    { backgroundColor: cupon.activo ? ADMIN_COLORS.success : ADMIN_COLORS.textLight },
                  ]}
                >
                  <Text style={adminStyles.badgeText}>
                    {cupon.activo ? 'Activo' : 'Inactivo'}
                  </Text>
                </View>

                <View style={adminStyles.cardActions}>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => openEdit(cupon)}
                  >
                    <Ionicons name="pencil" size={16} color={ADMIN_COLORS.primary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => handleDelete(cupon)}
                  >
                    <Ionicons name="trash-outline" size={16} color={ADMIN_COLORS.danger} />
                  </TouchableOpacity>

                </View>

              </View>

            </View>

          ))}

        </ScrollView>

      )}


      <TouchableOpacity style={adminStyles.fab} onPress={openCreate}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>


      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={adminStyles.modalBackdrop}>
          <View style={adminStyles.modalContent}>

            <ScrollView showsVerticalScrollIndicator={false}>

              <Text style={adminStyles.modalTitle}>
                {editingId ? 'Editar cupón' : 'Nuevo cupón'}
              </Text>

              <Text style={adminStyles.inputLabel}>Código</Text>
              <TextInput
                style={adminStyles.input}
                value={form.codigo}
                onChangeText={(v) => setForm({ ...form, codigo: v.toUpperCase() })}
                placeholder="BIENVENIDA10"
                autoCapitalize="characters"
              />

              <Text style={adminStyles.inputLabel}>Tipo de descuento</Text>
              <View style={adminStyles.pickerRow}>
                {TIPOS_DESCUENTO.map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={[
                      adminStyles.pickerOption,
                      tipoDescuento === tipo && adminStyles.pickerOptionSelected,
                    ]}
                    onPress={() => setTipoDescuento(tipo)}
                  >
                    <Text
                      style={[
                        adminStyles.pickerOptionText,
                        tipoDescuento === tipo && adminStyles.pickerOptionTextSelected,
                      ]}
                    >
                      {tipo === 'PORCENTAJE' ? 'Porcentaje (%)' : 'Monto fijo ($)'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={adminStyles.inputLabel}>
                Valor {tipoDescuento === 'PORCENTAJE' ? '(ej: 10 = 10%)' : '(en pesos)'}
              </Text>
              <TextInput
                style={adminStyles.input}
                value={form.valor}
                onChangeText={(v) => setForm({ ...form, valor: v.replace(/[^0-9.]/g, '') })}
                placeholder={tipoDescuento === 'PORCENTAJE' ? '10' : '10000'}
                keyboardType="numeric"
              />

              <Text style={adminStyles.inputLabel}>Compra mínima (opcional)</Text>
              <TextInput
                style={adminStyles.input}
                value={form.montoMinimo}
                onChangeText={(v) => setForm({ ...form, montoMinimo: v.replace(/[^0-9]/g, '') })}
                placeholder="0"
                keyboardType="numeric"
              />

              <Text style={adminStyles.inputLabel}>Fecha de inicio (AAAA-MM-DD)</Text>
              <TextInput
                style={adminStyles.input}
                value={form.fechaInicio}
                onChangeText={(v) => setForm({ ...form, fechaInicio: v })}
                placeholder="2026-01-01"
              />

              <Text style={adminStyles.inputLabel}>Fecha de fin (AAAA-MM-DD)</Text>
              <TextInput
                style={adminStyles.input}
                value={form.fechaFin}
                onChangeText={(v) => setForm({ ...form, fechaFin: v })}
                placeholder="2026-12-31"
              />

              <Text style={adminStyles.inputLabel}>Usos máximos (opcional, vacío = ilimitado)</Text>
              <TextInput
                style={adminStyles.input}
                value={form.usoMaximo}
                onChangeText={(v) => setForm({ ...form, usoMaximo: v.replace(/[^0-9]/g, '') })}
                placeholder="100"
                keyboardType="numeric"
              />

              <Text style={adminStyles.inputLabel}>Estado</Text>
              <View style={adminStyles.pickerRow}>
                {[
                  { value: true, label: 'Activo' },
                  { value: false, label: 'Inactivo' },
                ].map((opcion) => (
                  <TouchableOpacity
                    key={String(opcion.value)}
                    style={[
                      adminStyles.pickerOption,
                      activo === opcion.value && adminStyles.pickerOptionSelected,
                    ]}
                    onPress={() => setActivo(opcion.value)}
                  >
                    <Text
                      style={[
                        adminStyles.pickerOptionText,
                        activo === opcion.value && adminStyles.pickerOptionTextSelected,
                      ]}
                    >
                      {opcion.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[adminStyles.primaryButton, saving && { opacity: 0.6 }]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={adminStyles.primaryButtonText}>
                    {editingId ? 'Guardar cambios' : 'Crear cupón'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={adminStyles.secondaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={adminStyles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>

            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
};


export default GestionCupones;
