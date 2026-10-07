import React, { useEffect, useMemo, useState } from 'react';

import {
  Alert,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/AuthContext';
import { CarritoService } from '../../../data/services/CarritoService';
import { ProductVariant } from '../../../Domain/entities/Producto';

import { styles } from './styles';


const DetalleProducto = ({
  route,
  navigation,
}: any) => {

  const { product } = route.params;
  const { user } = useAuth();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variantes?.[0] ?? null
  );
  const [cantidad, setCantidad] = useState(1);
  const [adding, setAdding] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      const carrito = await CarritoService.ver(user.token);
      setCartCount(carrito.productos.length);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, [user]);

  const tallas = useMemo(
    () => Array.from(new Set<string>(product.variantes.map((v: ProductVariant) => v.talla))),
    [product.variantes]
  );

  const [tallaSeleccionada, setTallaSeleccionada] = useState<string>(
    selectedVariant?.talla ?? tallas[0] ?? ''
  );

  const coloresDeLaTalla = useMemo(
    () =>
      product.variantes.filter((v: ProductVariant) => v.talla === tallaSeleccionada),
    [product.variantes, tallaSeleccionada]
  );

  const seleccionarTalla = (talla: string) => {
    setTallaSeleccionada(talla);
    const primeraDeEsaTalla = product.variantes.find((v: ProductVariant) => v.talla === talla);
    setSelectedVariant(primeraDeEsaTalla ?? null);
    setCantidad(1);
  };

  const seleccionarVariante = (variante: ProductVariant) => {
    setSelectedVariant(variante);
    setCantidad(1);
  };



  const handleAddToCart = async () => {

    if (!user) {
      Alert.alert(
        'Inicia sesión',
        'Necesitas iniciar sesión para agregar productos al carrito.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Iniciar sesión',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
      return;
    }

    if (!selectedVariant) {
      Alert.alert('NatyMoon', 'Elige una talla y un color.');
      return;
    }

    if (selectedVariant.stock <= 0) {
      Alert.alert('NatyMoon', 'Esta variante no tiene stock disponible.');
      return;
    }

    setAdding(true);

    try {
      await CarritoService.agregar(selectedVariant.id, cantidad, user.token);

      loadCartCount();

      Alert.alert(
        'Producto agregado',
        `${product.name} (${selectedVariant.talla}/${selectedVariant.color}) se agregó al carrito.`,
        [
          { text: 'Seguir comprando' },
          {
            text: 'Ir al carrito',
            onPress: () => navigation.navigate('Carrito'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'NatyMoon',
        error?.message || 'No se pudo agregar el producto.'
      );
    } finally {
      setAdding(false);
    }
  };


  const sinVariantes = !product.variantes || product.variantes.length === 0;


  return (
    <View style={styles.container}>


      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#493275"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Detalle del producto
        </Text>


        <TouchableOpacity
          onPress={() => navigation.navigate('Carrito')}
          style={styles.cartButton}
        >

          <Ionicons
            name="bag-outline"
            size={24}
            color="#7C3AED"
          />

          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartCount}
              </Text>
            </View>
          )}

        </TouchableOpacity>

      </View>


      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >


        {product?.image && (

          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />

        )}



        <Text style={styles.productName}>
          {product?.name || 'Producto'}
        </Text>



        <Text style={styles.price}>
          ${Number(product.price).toLocaleString('es-CO')}
        </Text>



        {product?.description && (

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Descripción
            </Text>

            <Text style={styles.description}>
              {product.description}
            </Text>

          </View>

        )}



        {product?.category && (

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Categoría
            </Text>

            <Text style={styles.description}>
              {product.category}
            </Text>

          </View>

        )}



        {sinVariantes && (
          <View style={styles.section}>
            <Text style={styles.description}>
              Este producto todavía no tiene tallas/colores cargados.
            </Text>
          </View>
        )}



        {!sinVariantes && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Talla</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {tallas.map((talla) => (
                <TouchableOpacity
                  key={talla}
                  onPress={() => seleccionarTalla(talla)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    backgroundColor: tallaSeleccionada === talla ? '#7C3AED' : '#F1EAFB',
                  }}
                >
                  <Text style={{ color: tallaSeleccionada === talla ? '#FFFFFF' : '#493275', fontWeight: '600' }}>
                    {talla}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        )}



        {!sinVariantes && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Color</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {coloresDeLaTalla.map((variante: ProductVariant) => (
                <TouchableOpacity
                  key={variante.id}
                  onPress={() => seleccionarVariante(variante)}
                  disabled={variante.stock <= 0}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    backgroundColor: selectedVariant?.id === variante.id ? '#7C3AED' : '#F1EAFB',
                    opacity: variante.stock <= 0 ? 0.4 : 1,
                  }}
                >
                  <Text style={{ color: selectedVariant?.id === variante.id ? '#FFFFFF' : '#493275', fontWeight: '600' }}>
                    {variante.color}{variante.stock <= 0 ? ' (agotado)' : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        )}



        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Disponibilidad
          </Text>

          <Text style={styles.description}>
            {selectedVariant
              ? selectedVariant.stock > 0
                ? `${selectedVariant.stock} disponibles`
                : 'Sin stock en esta talla/color'
              : 'Elige talla y color'}
          </Text>

        </View>



        {!!selectedVariant && selectedVariant.stock > 0 && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Cantidad</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 }}>

              <TouchableOpacity
                onPress={() => setCantidad((c) => Math.max(1, c - 1))}
                style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1EAFB', alignItems: 'center', justifyContent: 'center' }}
              >
                <Ionicons name="remove" size={18} color="#7C3AED" />
              </TouchableOpacity>

              <Text style={{ fontSize: 16, fontWeight: '700', color: '#493275' }}>{cantidad}</Text>

              <TouchableOpacity
                onPress={() => setCantidad((c) => Math.min(selectedVariant.stock, c + 1))}
                style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1EAFB', alignItems: 'center', justifyContent: 'center' }}
              >
                <Ionicons name="add" size={18} color="#7C3AED" />
              </TouchableOpacity>

            </View>

          </View>
        )}



        <TouchableOpacity
          style={[
            styles.addButton,
            (adding || !selectedVariant || selectedVariant.stock <= 0) && { opacity: 0.6 },
          ]}
          onPress={handleAddToCart}
          activeOpacity={0.8}
          disabled={adding || !selectedVariant || selectedVariant.stock <= 0}
        >

          {adding ? (

            <ActivityIndicator color="#FFFFFF" />

          ) : (

            <>
              <Ionicons
                name="bag-add-outline"
                size={22}
                color="#FFFFFF"
              />

              <Text style={styles.addButtonText}>
                {selectedVariant && selectedVariant.stock > 0
                  ? 'Agregar al carrito'
                  : 'Sin stock'}
              </Text>
            </>

          )}

        </TouchableOpacity>

      </ScrollView>

    </View>
  );
};


export default DetalleProducto;
