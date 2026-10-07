import React from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { usePedidosViewModel } from './ViewModel';
import { styles } from './styles';


const ESTADO_COLORS: Record<string, string> = {
  PENDIENTE: '#D9A441',
  PAGADO: '#4B80B1',
  EN_PREPARACION: '#4B80B1',
  ENVIADO: '#4B80B1',
  ENTREGADO: '#4CA26A',
  CANCELADO: '#C04B6B',
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


const Pedidos = () => {

  const navigation = useNavigation<any>();

  const { ordenes, loading, user, reload } = usePedidosViewModel();


  // ======================================
  // SIN SESIÓN
  // ======================================

  if (!user) {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={25} color="#493275" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Mis pedidos</Text>

          <View style={styles.headerRight} />
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="lock-closed-outline" size={40} color="#8B63B7" />
          </View>

          <Text style={styles.emptyTitle}>Inicia sesión</Text>

          <Text style={styles.emptyText}>
            Necesitas una cuenta para ver tu historial de pedidos.
          </Text>
        </View>

      </View>
    );
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} color="#493275" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Mis pedidos</Text>

        <TouchableOpacity style={styles.headerRight} onPress={reload}>
          <Ionicons name="refresh" size={20} color="#493275" />
        </TouchableOpacity>

      </View>


      {loading && (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      )}


      {!loading && ordenes.length === 0 && (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="receipt-outline" size={40} color="#8B63B7" />
          </View>

          <Text style={styles.emptyTitle}>Aún no tienes pedidos</Text>

          <Text style={styles.emptyText}>
            Cuando completes una compra, aparecerá aquí.
          </Text>
        </View>
      )}


      {!loading && ordenes.length > 0 && (

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {ordenes.map((orden) => (

            <View key={orden.id} style={styles.card}>

              <View style={styles.cardHeader}>

                <Text style={styles.orderId}>
                  Pedido #{orden.id}
                </Text>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        ESTADO_COLORS[orden.estado] || '#8B63B7',
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>{orden.estado}</Text>
                </View>

              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Fecha</Text>
                <Text style={styles.value}>{formatFecha(orden.fechaCreacion)}</Text>
              </View>

              {!!orden.metodoPago && (
                <View style={styles.row}>
                  <Text style={styles.label}>Método de pago</Text>
                  <Text style={styles.value}>{orden.metodoPago}</Text>
                </View>
              )}

              <View style={styles.row}>
                <Text style={styles.label}>Dirección de envío</Text>
                <Text style={styles.value} numberOfLines={1}>{orden.direccion}</Text>
              </View>

              {!!orden.cuponAplicado && (
                <View style={styles.row}>
                  <Text style={styles.label}>Cupón</Text>
                  <Text style={styles.value}>{orden.cuponAplicado}</Text>
                </View>
              )}

              <View style={styles.divider} />

              {orden.productos.map((detalle, index) => (
                <View key={index} style={styles.productRow}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {detalle.nombreProducto} ({detalle.talla}/{detalle.color})
                  </Text>
                  <Text style={styles.productQty}>
                    x{detalle.cantidad}
                  </Text>
                  <Text style={styles.productSubtotal}>
                    {formatPrice(detalle.subtotal)}
                  </Text>
                </View>
              ))}

              <View style={styles.divider} />

              <View style={styles.row}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>{formatPrice(orden.subtotal)}</Text>
              </View>

              {orden.descuento > 0 && (
                <View style={styles.row}>
                  <Text style={styles.label}>Descuento</Text>
                  <Text style={styles.value}>-{formatPrice(orden.descuento)}</Text>
                </View>
              )}

              {orden.costoEnvio > 0 && (
                <View style={styles.row}>
                  <Text style={styles.label}>Envío</Text>
                  <Text style={styles.value}>{formatPrice(orden.costoEnvio)}</Text>
                </View>
              )}

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {formatPrice(orden.total)}
                </Text>
              </View>

            </View>

          ))}

        </ScrollView>

      )}

    </View>
  );
};


export default Pedidos;
