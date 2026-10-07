import React from 'react';

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useCarritoViewModel } from './ViewModel';
import { useAuth } from '../../context/AuthContext';

import { styles } from './styles';


const formatPrice = (price: number) => {
  return `$${price.toFixed(2).replace('.', ',')}`;
};


const Carrito = ({ navigation }: any) => {

  const { user } = useAuth();

  const {
    items,
    loading,
    removeFromCart,
    updateCantidad,
    totalItems,
    subtotal,
    shipping,
    total,
    reload,
  } = useCarritoViewModel();


  const handleRemove = (idDetalle: number, nombre: string) => {
    Alert.alert(
      'Eliminar producto',
      `¿Quitar "${nombre}" del carrito?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFromCart(idDetalle);
            } catch (error: any) {
              Alert.alert('NatyMoon', error?.message || 'No se pudo eliminar el producto.');
            }
          },
        },
      ]
    );
  };

  const handleQuantityChange = async (idDetalle: number, nuevaCantidad: number, stockDisponible: number) => {
    if (nuevaCantidad < 1) return;

    if (nuevaCantidad > stockDisponible) {
      Alert.alert('NatyMoon', `Solo hay ${stockDisponible} disponibles.`);
      return;
    }

    try {
      await updateCantidad(idDetalle, nuevaCantidad);
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo actualizar la cantidad.');
    }
  };

  const handleGoToCheckout = () => {
    navigation.navigate('Checkout', { subtotal, shipping, total });
  };


  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#493275" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi carrito</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="lock-closed-outline" size={40} color="#8B63B7" />
          </View>
          <Text style={styles.emptyTitle}>Inicia sesión</Text>
          <Text style={styles.emptyText}>
            Necesitas una cuenta para ver y usar tu carrito.
          </Text>
          <TouchableOpacity
            style={[styles.checkoutButton, { marginTop: 20, width: '100%' }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.checkoutText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#493275" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi carrito</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      </View>
    );
  }


  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#493275" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi carrito</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="bag-outline" size={45} color="#8B63B7" />
          </View>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyText}>
            Agrega tus pijamas favoritas y aparecerán aquí.
          </Text>
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#493275" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi carrito</Text>
        <TouchableOpacity style={styles.headerRight} onPress={reload}>
          <Ionicons name="refresh" size={20} color="#493275" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        <Text style={{ fontSize: 15, color: '#8B7898', marginBottom: 14 }}>
          {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
        </Text>

        {items.map((item) => (

          <View key={item.idDetalle} style={styles.item}>

            <View style={[styles.itemImage, { alignItems: 'center', justifyContent: 'center' }]}>
              <Ionicons name="shirt-outline" size={34} color="#B79ED0" />
            </View>

            <View style={styles.itemInfo}>

              <Text style={styles.itemName}>{item.nombreProducto}</Text>

              <Text style={styles.itemSize}>
                Talla {item.talla} · {item.color}
              </Text>

              <Text style={styles.itemPrice}>
                {formatPrice(item.precioUnitario)} c/u · {formatPrice(item.subtotal)}
              </Text>

              <View style={styles.bottomRow}>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.idDetalle, item.cantidad - 1, item.stockDisponible)}
                  >
                    <Ionicons name="remove" size={16} color="#493275" />
                  </TouchableOpacity>

                  <Text style={styles.quantity}>{item.cantidad}</Text>

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.idDetalle, item.cantidad + 1, item.stockDisponible)}
                  >
                    <Ionicons name="add" size={16} color="#493275" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemove(item.idDetalle, item.nombreProducto)}
                >
                  <Ionicons name="trash-outline" size={21} color="#B04A83" />
                </TouchableOpacity>

              </View>

            </View>

          </View>

        ))}

        <View style={styles.summary}>

          <Text style={styles.summaryTitle}>Resumen de compra</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={handleGoToCheckout}>
            <Text style={styles.checkoutText}>Continuar con la compra</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
};


export default Carrito;
