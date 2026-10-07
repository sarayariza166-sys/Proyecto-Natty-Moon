import React, { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { ReporteService, ResumenReporte } from '../../../data/services/ReporteService';

import { adminStyles, ADMIN_COLORS } from './styles';


const formatPrice = (price: number) => `$${Number(price).toLocaleString('es-CO')}`;

const ESTADO_LABELS: Record<string, string> = {
  PENDIENTE: 'En proceso',
  PAGADO: 'Pagado',
  EN_PREPARACION: 'En preparación',
  ENVIADO: 'En camino',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
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


const Reportes = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [resumen, setResumen] = useState<ResumenReporte | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await ReporteService.obtenerResumen(user.token);
      setResumen(data);
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


  return (
    <View style={adminStyles.container}>

      <View style={adminStyles.header}>

        <TouchableOpacity
          style={adminStyles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu-outline" size={27} color={ADMIN_COLORS.primaryDark} />
        </TouchableOpacity>

        <Text style={adminStyles.headerTitle}>Reportes</Text>

        <TouchableOpacity style={adminStyles.headerRight} onPress={load}>
          <Ionicons name="refresh" size={20} color={ADMIN_COLORS.primaryDark} />
        </TouchableOpacity>

      </View>


      {loading || !resumen ? (

        <View style={adminStyles.emptyContainer}>
          <ActivityIndicator size="large" color={ADMIN_COLORS.primary} />
        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={adminStyles.content}
        >

          {/* TOTALES */}
          <View style={adminStyles.statsRow}>

            <View style={adminStyles.statCard}>
              <Ionicons name="cash-outline" size={22} color={ADMIN_COLORS.primary} />
              <Text style={adminStyles.statValue}>{formatPrice(resumen.totalVentas)}</Text>
              <Text style={adminStyles.statLabel}>Ventas totales</Text>
            </View>

            <View style={adminStyles.statCard}>
              <Ionicons name="receipt-outline" size={22} color={ADMIN_COLORS.primary} />
              <Text style={adminStyles.statValue}>{resumen.totalPedidos}</Text>
              <Text style={adminStyles.statLabel}>Pedidos totales</Text>
            </View>

          </View>

          {/* PEDIDOS POR ESTADO */}
          <Text style={adminStyles.sectionTitle}>Pedidos por estado</Text>

          <View style={adminStyles.card}>
            <View style={{ flex: 1 }}>
              {Object.entries(resumen.pedidosPorEstado).map(([estado, cantidad]) => (
                <View
                  key={estado}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 6,
                  }}
                >
                  <Text style={adminStyles.cardSubtitle}>
                    {ESTADO_LABELS[estado] || estado}
                  </Text>
                  <Text style={[adminStyles.cardSubtitle, { fontWeight: '700', color: ADMIN_COLORS.text }]}>
                    {cantidad}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* VENTAS POR MÉTODO DE PAGO */}
          <Text style={adminStyles.sectionTitle}>Ventas por método de pago</Text>

          <View style={adminStyles.card}>
            <View style={{ flex: 1 }}>
              {Object.keys(resumen.ventasPorMetodoPago).length === 0 ? (
                <Text style={adminStyles.cardSubtitle}>Todavía no hay pagos registrados.</Text>
              ) : (
                Object.entries(resumen.ventasPorMetodoPago).map(([metodo, monto]) => (
                  <View
                    key={metodo}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={adminStyles.cardSubtitle}>
                      {METODO_LABELS[metodo] || metodo}
                    </Text>
                    <Text style={[adminStyles.cardSubtitle, { fontWeight: '700', color: ADMIN_COLORS.text }]}>
                      {formatPrice(monto)}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* TOP PRODUCTOS */}
          <Text style={adminStyles.sectionTitle}>Productos más vendidos</Text>

          <View style={adminStyles.card}>
            <View style={{ flex: 1 }}>
              {resumen.topProductos.length === 0 ? (
                <Text style={adminStyles.cardSubtitle}>Todavía no hay ventas registradas.</Text>
              ) : (
                resumen.topProductos.map((producto, index) => (
                  <View
                    key={producto.nombreProducto}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      borderTopWidth: index === 0 ? 0 : 1,
                      borderTopColor: ADMIN_COLORS.border,
                    }}
                  >
                    <Text style={adminStyles.cardSubtitle} numberOfLines={1}>
                      {index + 1}. {producto.nombreProducto}
                    </Text>

                    <Text style={[adminStyles.cardSubtitle, { fontWeight: '700', color: ADMIN_COLORS.text }]}>
                      {producto.cantidadVendida} vendidos · {formatPrice(producto.ingresos)}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>

        </ScrollView>

      )}

    </View>
  );
};


export default Reportes;
