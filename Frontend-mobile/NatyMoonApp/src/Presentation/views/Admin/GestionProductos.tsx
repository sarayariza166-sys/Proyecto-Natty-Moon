import React, { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../context/AuthContext';
import { ProductoService } from '../../../data/services/ProductoService';
import { CategoriaService } from '../../../data/services/CategoriaService';
import { GENEROS, Genero, Product, ProductoInput } from '../../../Domain/entities/Producto';
import { Categoria } from '../../../Domain/entities/Categoria';

import { adminStyles, ADMIN_COLORS } from './styles';


type VarianteForm = {
  id?: number; // si tiene id, es una variante existente (se actualiza); si no, es nueva
  talla: string;
  color: string;
  stock: string;
};

const EMPTY_FORM = {
  nombre: '',
  descripcion: '',
  precioBase: '',
  precioOferta: '',
  material: '',
  urlImagen: '',
};

const slugify = (texto: string) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');


const GestionProductos = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [selectedGenero, setSelectedGenero] = useState<Genero | null>(null);
  const [variantes, setVariantes] = useState<VarianteForm[]>([]);
  const [saving, setSaving] = useState(false);


  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        ProductoService.listar(),
        CategoriaService.listar(),
      ]);
      setProductos(prods);
      setCategorias(cats);
    } catch (error) {
      console.log('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );


  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSelectedCategoria(categorias[0]?.id ?? null);
    setSelectedGenero('UNISEX');
    setVariantes([{ talla: '', color: '', stock: '' }]);
    setModalVisible(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      nombre: product.name,
      descripcion: product.description,
      precioBase: String(product.basePrice),
      precioOferta: product.offerPrice != null ? String(product.offerPrice) : '',
      material: product.material,
      urlImagen: product.image,
    });
    setSelectedCategoria(product.categoryId ?? categorias[0]?.id ?? null);
    setSelectedGenero(product.genero ?? 'UNISEX');
    setVariantes(
      product.variantes.length > 0
        ? product.variantes.map((v) => ({
            id: v.id,
            talla: v.talla,
            color: v.color,
            stock: String(v.stock),
          }))
        : [{ talla: '', color: '', stock: '' }]
    );
    setModalVisible(true);
  };


  // ==========================================
  // VARIANTES (filas dinámicas talla/color/stock)
  // ==========================================

  const addVarianteRow = () => {
    setVariantes((current) => [...current, { talla: '', color: '', stock: '' }]);
  };

  const removeVarianteRow = (index: number) => {
    setVariantes((current) => current.filter((_, i) => i !== index));
  };

  const updateVarianteRow = (index: number, field: keyof VarianteForm, value: string) => {
    setVariantes((current) =>
      current.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };


  // ==========================================
  // FOTO (cámara o galería) -> se guarda como base64
  // ==========================================

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert('NatyMoon', 'Necesitas darle permiso de cámara a la app para tomar la foto.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
    });

    aplicarFotoSeleccionada(resultado);
  };

  const elegirDeGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert('NatyMoon', 'Necesitas darle permiso a tus fotos para elegir una imagen.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ['images'],
    });

    aplicarFotoSeleccionada(resultado);
  };

  const aplicarFotoSeleccionada = (resultado: ImagePicker.ImagePickerResult) => {
    if (resultado.canceled || !resultado.assets?.[0]?.base64) return;

    const base64 = resultado.assets[0].base64;
    setForm((current) => ({ ...current, urlImagen: `data:image/jpeg;base64,${base64}` }));
  };


  // ==========================================
  // GUARDAR
  // ==========================================

  const handleSave = async () => {
    if (!user) return;

    if (!form.nombre.trim() || !form.precioBase || !selectedCategoria || !selectedGenero) {
      Alert.alert('NatyMoon', 'Completa nombre, precio base, categoría y género.');
      return;
    }

    const variantesValidas = variantes.filter(
      (v) => v.talla.trim() && v.color.trim() && v.stock !== ''
    );

    if (variantesValidas.length === 0) {
      Alert.alert('NatyMoon', 'Agrega al menos una variante (talla, color y stock).');
      return;
    }

    const input: ProductoInput = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      categoria: { id: selectedCategoria },
      precioBase: Number(form.precioBase),
      precioOferta: form.precioOferta ? Number(form.precioOferta) : null,
      genero: selectedGenero,
      material: form.material.trim(),
      activo: true,
    };

    setSaving(true);

    try {
      const producto = editingId
        ? await ProductoService.actualizar(editingId, input, user.token)
        : await ProductoService.crear(input, user.token);

      // Imagen (una sola, la principal)
      if (form.urlImagen.trim()) {
        await ProductoService.fijarImagen(producto.id, form.urlImagen.trim(), user.token);
      }

      // Variantes: actualiza las que ya tenían id, crea las nuevas
      for (const v of variantesValidas) {
        if (v.id) {
          await ProductoService.actualizarVariante(
            v.id,
            {
              producto: { id: producto.id },
              sku: `${slugify(producto.nombre)}-${slugify(v.talla)}-${slugify(v.color)}-${v.id}`,
              talla: v.talla.trim(),
              color: v.color.trim(),
              stock: Number(v.stock),
              precioAdicional: 0,
              activo: true,
            },
            user.token
          );
        } else {
          await ProductoService.crearVariante(
            {
              producto: { id: producto.id },
              sku: `${slugify(producto.nombre)}-${slugify(v.talla)}-${slugify(v.color)}-${Date.now()}`,
              talla: v.talla.trim(),
              color: v.color.trim(),
              stock: Number(v.stock),
              precioAdicional: 0,
              activo: true,
            },
            user.token
          );
        }
      }

      setModalVisible(false);
      await load();

    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo guardar el producto.');
    } finally {
      setSaving(false);
    }
  };


  const handleDelete = (product: Product) => {
    Alert.alert(
      'Eliminar producto',
      `¿Eliminar "${product.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            try {
              await ProductoService.eliminar(product.id, user.token);
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

        <Text style={adminStyles.headerTitle}>Productos</Text>

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

          {productos.length === 0 && (
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="shirt-outline" size={40} color={ADMIN_COLORS.textLight} />
              <Text style={adminStyles.emptyText}>
                Todavía no hay productos. Agrega el primero con el botón +.
              </Text>
            </View>
          )}

          {productos.map((product) => (

            <View key={product.id} style={adminStyles.card}>

              {product.image ? (
                <Image
                  source={{ uri: product.image }}
                  style={adminStyles.cardImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={adminStyles.cardImage}>
                  <Ionicons name="shirt-outline" size={26} color="#B79ED0" />
                </View>
              )}

              <View style={adminStyles.cardInfo}>

                <Text style={adminStyles.cardTitle} numberOfLines={1}>
                  {product.name}
                </Text>

                <Text style={adminStyles.cardSubtitle}>
                  {product.category || 'Sin categoría'}
                </Text>

                <Text style={adminStyles.cardSubtitle}>
                  ${product.price} · Stock total: {product.stock} · {product.variantes.length} variante(s)
                </Text>

                <View style={adminStyles.cardActions}>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => openEdit(product)}
                  >
                    <Ionicons name="pencil" size={16} color={ADMIN_COLORS.primary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => handleDelete(product)}
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
                {editingId ? 'Editar producto' : 'Nuevo producto'}
              </Text>

              <Text style={adminStyles.inputLabel}>Nombre</Text>
              <TextInput
                style={adminStyles.input}
                value={form.nombre}
                onChangeText={(v) => setForm({ ...form, nombre: v })}
                placeholder="Pijama Luna Rosa"
              />

              <Text style={adminStyles.inputLabel}>Descripción</Text>
              <TextInput
                style={adminStyles.input}
                value={form.descripcion}
                onChangeText={(v) => setForm({ ...form, descripcion: v })}
                placeholder="Descripción del producto"
                multiline
              />

              <Text style={adminStyles.inputLabel}>Precio base</Text>
              <TextInput
                style={adminStyles.input}
                value={form.precioBase}
                onChangeText={(v) => setForm({ ...form, precioBase: v.replace(/[^0-9]/g, '') })}
                placeholder="89900"
                keyboardType="numeric"
              />

              <Text style={adminStyles.inputLabel}>Precio de oferta (opcional)</Text>
              <TextInput
                style={adminStyles.input}
                value={form.precioOferta}
                onChangeText={(v) => setForm({ ...form, precioOferta: v.replace(/[^0-9]/g, '') })}
                placeholder="Déjalo vacío si no hay oferta"
                keyboardType="numeric"
              />

              <Text style={adminStyles.inputLabel}>Material</Text>
              <TextInput
                style={adminStyles.input}
                value={form.material}
                onChangeText={(v) => setForm({ ...form, material: v })}
                placeholder="Algodón"
              />

              <Text style={adminStyles.inputLabel}>Foto del producto</Text>

              {!!form.urlImagen && (
                <Image
                  source={{ uri: form.urlImagen }}
                  style={{ width: 120, height: 120, borderRadius: 12, marginBottom: 10, alignSelf: 'center' }}
                  resizeMode="cover"
                />
              )}

              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>

                <TouchableOpacity
                  style={[adminStyles.secondaryButton, { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 6 }]}
                  onPress={tomarFoto}
                >
                  <Ionicons name="camera-outline" size={18} color={ADMIN_COLORS.primary} />
                  <Text style={adminStyles.secondaryButtonText}>Tomar foto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[adminStyles.secondaryButton, { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 6 }]}
                  onPress={elegirDeGaleria}
                >
                  <Ionicons name="images-outline" size={18} color={ADMIN_COLORS.primary} />
                  <Text style={adminStyles.secondaryButtonText}>Galería</Text>
                </TouchableOpacity>

              </View>

              <Text style={adminStyles.inputLabel}>...o pega una URL de imagen</Text>
              <TextInput
                style={adminStyles.input}
                value={form.urlImagen.startsWith('data:') ? '' : form.urlImagen}
                onChangeText={(v) => setForm({ ...form, urlImagen: v })}
                placeholder="https://..."
                autoCapitalize="none"
              />

              <Text style={adminStyles.inputLabel}>Categoría</Text>
              <View style={adminStyles.pickerRow}>
                {categorias.map((categoria) => (
                  <TouchableOpacity
                    key={categoria.id}
                    style={[
                      adminStyles.pickerOption,
                      selectedCategoria === categoria.id && adminStyles.pickerOptionSelected,
                    ]}
                    onPress={() => setSelectedCategoria(categoria.id)}
                  >
                    <Text
                      style={[
                        adminStyles.pickerOptionText,
                        selectedCategoria === categoria.id && adminStyles.pickerOptionTextSelected,
                      ]}
                    >
                      {categoria.nombre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={adminStyles.inputLabel}>Género</Text>
              <View style={adminStyles.pickerRow}>
                {GENEROS.map((genero) => (
                  <TouchableOpacity
                    key={genero}
                    style={[
                      adminStyles.pickerOption,
                      selectedGenero === genero && adminStyles.pickerOptionSelected,
                    ]}
                    onPress={() => setSelectedGenero(genero)}
                  >
                    <Text
                      style={[
                        adminStyles.pickerOptionText,
                        selectedGenero === genero && adminStyles.pickerOptionTextSelected,
                      ]}
                    >
                      {genero}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[adminStyles.inputLabel, { marginTop: 20 }]}>
                Variantes (talla, color y stock)
              </Text>

              {variantes.map((v, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', gap: 8, marginTop: 8, alignItems: 'center' }}
                >
                  <TextInput
                    style={[adminStyles.input, { flex: 1 }]}
                    value={v.talla}
                    onChangeText={(val) => updateVarianteRow(index, 'talla', val)}
                    placeholder="Talla (S/M/L)"
                  />
                  <TextInput
                    style={[adminStyles.input, { flex: 1 }]}
                    value={v.color}
                    onChangeText={(val) => updateVarianteRow(index, 'color', val)}
                    placeholder="Color"
                  />
                  <TextInput
                    style={[adminStyles.input, { flex: 1 }]}
                    value={v.stock}
                    onChangeText={(val) => updateVarianteRow(index, 'stock', val.replace(/[^0-9]/g, ''))}
                    placeholder="Stock"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity onPress={() => removeVarianteRow(index)}>
                    <Ionicons name="close-circle" size={22} color={ADMIN_COLORS.danger} />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                style={[adminStyles.secondaryButton, { marginTop: 10 }]}
                onPress={addVarianteRow}
              >
                <Text style={adminStyles.secondaryButtonText}>+ Agregar otra variante</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[adminStyles.primaryButton, saving && { opacity: 0.6 }]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={adminStyles.primaryButtonText}>
                    {editingId ? 'Guardar cambios' : 'Crear producto'}
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


export default GestionProductos;
