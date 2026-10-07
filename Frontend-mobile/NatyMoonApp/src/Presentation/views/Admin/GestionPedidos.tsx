import React, { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { OrdenAdminService } from '../../../data/services/OrdenAdminService';
import { EstadoOrden, Orden } from '../../../Domain/entities/Orden';

import { adminStyles, ADMIN_COLORS } from './styles';


// Simplificamos los 6 estados del backend a 4 botones claros para el día a
// día del admin/empleado. PAGADO y EN_PREPARACION (si llegaran a aparecer
// por otro medio) se muestran agrupados visualmente como "En proceso".
const ESTADOS_UI: { value: EstadoOrden; label: string; color: string }[] = [
  { value: 'PENDIENTE', label: 'En proceso', color: ADMIN_COLORS.warning },
  { value: 'ENVIADO', label: 'En camino', color: '#4B80B1' },
  { value: 'ENTREGADO', label: 'Entregado', color: ADMIN_COLORS.success },
  { value: 'CANCELADO', label: 'Cancelado', color: ADMIN_COLORS.danger },
];

const ESTADO_DISPLAY: Record<string, { label: string; color: string }> = {
  PENDIENTE: { label: 'En proceso', color: ADMIN_COLORS.warning },
  PAGADO: { label: 'En proceso', color: ADMIN_COLORS.warning },
  EN_PREPARACION: { label: 'En proceso', color: ADMIN_COLORS.warning },
  ENVIADO: { label: 'En camino', color: '#4B80B1' },
  ENTREGADO: { label: 'Entregado', color: ADMIN_COLORS.success },
  CANCELADO: { label: 'Cancelado', color: ADMIN_COLORS.danger },
};

const METODO_LABELS: Record<string, string> = {
  NEQUI: 'Nequi',
  DAVIPLATA: 'Daviplata',
  NU: 'Nu',
  TARJETA: 'Tarjeta',
  PSE: 'PSE',
  EFECTIVO: 'Efectivo',
  TRANSFERENCIA: 'Transferencia',
};

const formatPrice = (price: number) => `$${Number(price).toLocaleString('es-CO')}`;

const formatFecha = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};


const GestionPedidos = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);


  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await OrdenAdminService.verTodasLasOrdenes(user.token);
      setOrdenes([...data].sort((a, b) => b.id - a.id));
    } catch (error) {
      console.log('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );


  const updateEstado = async (id: number, estado: EstadoOrden) => {
    if (!user) return;

    setUpdatingId(id);

    try {
      await OrdenAdminService.cambiarEstado(id, estado, user.token);
      setOrdenes((current) =>
        current.map((o) => (o.id === id ? { ...o, estado } : o))
      );
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo actualizar el estado.');
    } finally {
      setUpdatingId(null);
    }
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

        <Text style={adminStyles.headerTitle}>Pedidos</Text>

        <TouchableOpacity style={adminStyles.headerRight} onPress={load}>
          <Ionicons name="refresh" size={20} color={ADMIN_COLORS.primaryDark} />
        </TouchableOpacity>

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

          {ordenes.length === 0 && (
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="receipt-outline" size={40} color={ADMIN_COLORS.textLight} />
              <Text style={adminStyles.emptyText}>
                Todavía no hay pedidos registrados.
              </Text>
            </View>
          )}

          {ordenes.map((orden) => {
            const expanded = expandedId === orden.id;
            const display = ESTADO_DISPLAY[orden.estado] || { label: orden.estado, color: ADMIN_COLORS.primary };

            return (
              <View
                key={orden.id}
                style={[
                  adminStyles.card,
                  { flexDirection: 'column', opacity: updatingId === orden.id ? 0.6 : 1 },
                ]}
              >

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setExpandedId(expanded ? null : orden.id)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  disabled={updatingId === orden.id}
                >

                  <View style={{ flex: 1 }}>

                    <Text style={adminStyles.cardTitle}>
                      Pedido #{orden.id}
                    </Text>

                    <Text style={adminStyles.cardSubtitle}>
                      {orden.cliente
                        ? `${orden.cliente.nombre} ${orden.cliente.apellido} · ${orden.cliente.email}`
                        : 'Cliente no disponible'}
                    </Text>

                    <Text style={adminStyles.cardSubtitle}>
                      {formatFecha(orden.fechaCreacion)} · {formatPrice(orden.total)}
                    </Text>

                    <View
                      style={[
                        adminStyles.badge,
                        { backgroundColor: display.color, marginTop: 6 },
                      ]}
                    >
                      <Text style={adminStyles.badgeText}>{display.label}</Text>
                    </View>

                  </View>

                  <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={ADMIN_COLORS.textLight}
                  />

                </TouchableOpacity>


                {expanded && (
                  <View style={{ marginTop: 14 }}>

                    {/* DIRECCIÓN */}
                    <Text style={[adminStyles.inputLabel, { marginTop: 0 }]}>Dirección de envío</Text>
                    <Text style={adminStyles.cardSubtitle}>{orden.direccion}</Text>

                    {/* MÉTODO DE PAGO */}
                    {!!orden.metodoPago && (
                      <>
                        <Text style={adminStyles.inputLabel}>Método de pago</Text>
                        <Text style={adminStyles.cardSubtitle}>
                          {METODO_LABELS[orden.metodoPago] || orden.metodoPago}
                        </Text>
                      </>
                    )}

                    {/* CUPÓN */}
                    {!!orden.cuponAplicado && (
                      <>
                        <Text style={adminStyles.inputLabel}>Cupón aplicado</Text>
                        <Text style={adminStyles.cardSubtitle}>{orden.cuponAplicado}</Text>
                      </>
                    )}

                    {/* PRODUCTOS */}
                    <Text style={adminStyles.inputLabel}>Productos</Text>

                    {orden.productos.length === 0 ? (
                      <Text style={adminStyles.cardSubtitle}>Sin detalle de productos.</Text>
                    ) : (
                      orden.productos.map((detalle, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 4,
                          }}
                        >
                          <Text style={adminStyles.cardSubtitle} numberOfLines={1}>
                            {detalle.nombreProducto} ({detalle.talla}/{detalle.color}) x{detalle.cantidad}
                          </Text>
                          <Text style={adminStyles.cardSubtitle}>
                            {formatPrice(detalle.subtotal)}
                          </Text>
                        </View>
                      ))
                    )}

                    {/* TOTALES */}
                    <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: ADMIN_COLORS.border }}>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={adminStyles.cardSubtitle}>Subtotal</Text>
                        <Text style={adminStyles.cardSubtitle}>{formatPrice(orden.subtotal)}</Text>
                      </View>

                      {orden.descuento > 0 && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={adminStyles.cardSubtitle}>Descuento</Text>
                          <Text style={adminStyles.cardSubtitle}>-{formatPrice(orden.descuento)}</Text>
                        </View>
                      )}

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[adminStyles.cardSubtitle, { fontWeight: '700', color: ADMIN_COLORS.text }]}>Total</Text>
                        <Text style={[adminStyles.cardSubtitle, { fontWeight: '700', color: ADMIN_COLORS.text }]}>
                          {formatPrice(orden.total)}
                        </Text>
                      </View>

                    </View>

                    {/* CAMBIAR ESTADO */}
                    <Text style={adminStyles.inputLabel}>Cambiar estado</Text>

                    <View style={adminStyles.pickerRow}>
                      {ESTADOS_UI.map((estadoUi) => (
                        <TouchableOpacity
                          key={estadoUi.value}
                          style={[
                            adminStyles.pickerOption,
                            orden.estado === estadoUi.value && { backgroundColor: estadoUi.color },
                          ]}
                          onPress={() => updateEstado(orden.id, estadoUi.value)}
                          disabled={updatingId === orden.id}
                        >
                          <Text
                            style={[
                              adminStyles.pickerOptionText,
                              orden.estado === estadoUi.value && { color: '#FFFFFF' },
                            ]}
                          >
                            {estadoUi.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                  </View>
                )}

              </View>
            );
          })}

        </ScrollView>

      )}

    </View>
  );
};


export default GestionPedidos;
