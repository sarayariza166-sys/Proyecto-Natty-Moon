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

import { useCuponesViewModel } from './ViewModel';
import { styles } from './styles';


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


const Cupones = () => {

  const navigation = useNavigation<any>();
  const { cupones, loading, user, reload } = useCuponesViewModel();


  if (!user) {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu-outline" size={27} color="#493275" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Cupones</Text>

          <View style={styles.headerRight} />
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="lock-closed-outline" size={40} color="#8B63B7" />
          </View>

          <Text style={styles.emptyTitle}>Inicia sesión</Text>

          <Text style={styles.emptyText}>
            Necesitas una cuenta para ver los cupones disponibles.
          </Text>
        </View>

      </View>
    );
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu-outline" size={27} color="#493275" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cupones</Text>

        <TouchableOpacity style={styles.headerRight} onPress={reload}>
          <Ionicons name="refresh" size={20} color="#493275" />
        </TouchableOpacity>

      </View>


      {loading && (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      )}


      {!loading && cupones.length === 0 && (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="pricetag-outline" size={40} color="#8B63B7" />
          </View>

          <Text style={styles.emptyTitle}>No hay cupones activos</Text>

          <Text style={styles.emptyText}>
            Cuando haya descuentos disponibles, van a aparecer aquí.
          </Text>
        </View>
      )}


      {!loading && cupones.length > 0 && (

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <Text style={[styles.emptyText, { textAlign: 'left', marginBottom: 14 }]}>
            Usa el código en el checkout, en el campo "Cupón", al confirmar tu compra.
          </Text>

          {cupones.map((cupon) => (

            <View key={cupon.id} style={styles.card}>

              <View style={styles.cardHeader}>

                <Text style={styles.codigo}>{cupon.codigo}</Text>

                <View style={styles.valorBadge}>
                  <Text style={styles.valorBadgeText}>
                    {cupon.tipoDescuento === 'PORCENTAJE'
                      ? `-${cupon.valor}%`
                      : `-${formatPrice(cupon.valor)}`}
                  </Text>
                </View>

              </View>

              {cupon.montoMinimo > 0 && (
                <View style={styles.detalleRow}>
                  <Text style={styles.detalleLabel}>Compra mínima</Text>
                  <Text style={styles.detalleValue}>{formatPrice(cupon.montoMinimo)}</Text>
                </View>
              )}

              <View style={styles.detalleRow}>
                <Text style={styles.detalleLabel}>Válido hasta</Text>
                <Text style={styles.detalleValue}>{formatFecha(cupon.fechaFin)}</Text>
              </View>

              {cupon.usoMaximo != null && (
                <View style={styles.detalleRow}>
                  <Text style={styles.detalleLabel}>Usos disponibles</Text>
                  <Text style={styles.detalleValue}>
                    {Math.max(cupon.usoMaximo - cupon.usosActuales, 0)}
                  </Text>
                </View>
              )}

            </View>

          ))}

        </ScrollView>

      )}

    </View>
  );
};


export default Cupones;
