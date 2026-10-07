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
import { CategoriaService } from '../../../data/services/CategoriaService';
import { Categoria } from '../../../Domain/entities/Categoria';

import { adminStyles, ADMIN_COLORS } from './styles';


const GestionCategorias = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [saving, setSaving] = useState(false);


  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CategoriaService.listar();
      setCategorias(data);
    } catch (error) {
      console.log('Error al cargar categorías:', error);
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
    setNombre('');
    setDescripcion('');
    setImagen('');
    setModalVisible(true);
  };

  const openEdit = (categoria: Categoria) => {
    setEditingId(categoria.id);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion ?? '');
    setImagen(categoria.imagen ?? '');
    setModalVisible(true);
  };

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
    setImagen(`data:image/jpeg;base64,${base64}`);
  };

  const handleSave = async () => {
    if (!user) return;

    if (!nombre.trim()) {
      Alert.alert('NatyMoon', 'El nombre es obligatorio.');
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await CategoriaService.actualizar(editingId, nombre.trim(), descripcion.trim(), imagen.trim(), user.token);
      } else {
        await CategoriaService.crear(nombre.trim(), descripcion.trim(), imagen.trim(), user.token);
      }

      setModalVisible(false);
      await load();
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo guardar la categoría.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (categoria: Categoria) => {
    Alert.alert(
      'Eliminar categoría',
      `¿Eliminar "${categoria.nombre}"? Los productos que la usan quedarán sin categoría.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            try {
              await CategoriaService.eliminar(categoria.id, user.token);
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

        <Text style={adminStyles.headerTitle}>Catálogos</Text>

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

          {categorias.length === 0 && (
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="pricetags-outline" size={40} color={ADMIN_COLORS.textLight} />
              <Text style={adminStyles.emptyText}>
                Todavía no hay catálogos. Agrega el primero con el botón +.
              </Text>
            </View>
          )}

          {categorias.map((categoria) => (

            <View key={categoria.id} style={adminStyles.card}>

              <View style={adminStyles.cardImage}>
                {categoria.imagen ? (
                  <Image
                    source={{ uri: categoria.imagen }}
                    style={{ width: 64, height: 64, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="pricetag-outline" size={24} color="#B79ED0" />
                )}
              </View>

              <View style={adminStyles.cardInfo}>

                <Text style={adminStyles.cardTitle} numberOfLines={1}>
                  {categoria.nombre}
                </Text>

                {!!categoria.descripcion && (
                  <Text style={adminStyles.cardSubtitle} numberOfLines={2}>
                    {categoria.descripcion}
                  </Text>
                )}

                <View style={adminStyles.cardActions}>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => openEdit(categoria)}
                  >
                    <Ionicons name="pencil" size={16} color={ADMIN_COLORS.primary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => handleDelete(categoria)}
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
                {editingId ? 'Editar catálogo' : 'Nuevo catálogo'}
              </Text>

              <Text style={adminStyles.inputLabel}>Nombre</Text>
              <TextInput
                style={adminStyles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Pijamas de invierno"
              />

              <Text style={adminStyles.inputLabel}>Descripción (opcional)</Text>
              <TextInput
                style={adminStyles.input}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="Descripción de la categoría"
                multiline
              />

              <Text style={adminStyles.inputLabel}>Foto del catálogo</Text>

              {!!imagen && (
                <Image
                  source={{ uri: imagen }}
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
                value={imagen.startsWith('data:') ? '' : imagen}
                onChangeText={setImagen}
                placeholder="https://..."
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[adminStyles.primaryButton, saving && { opacity: 0.6 }]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={adminStyles.primaryButtonText}>
                    {editingId ? 'Guardar cambios' : 'Crear catálogo'}
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


export default GestionCategorias;
