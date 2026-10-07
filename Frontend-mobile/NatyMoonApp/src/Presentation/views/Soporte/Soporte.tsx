import React from 'react';

import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useSoporteViewModel } from './ViewModel';
import { styles } from './styles';


const ESTADO_COLORS: Record<string, string> = {
  ABIERTA: '#D9A441',
  EN_PROCESO: '#4B80B1',
  RESUELTA: '#4CA26A',
};

const ESTADO_LABELS: Record<string, string> = {
  ABIERTA: 'Abierto',
  EN_PROCESO: 'En proceso',
  RESUELTA: 'Resuelto',
};

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


const Soporte = () => {

  const navigation = useNavigation<any>();

  const {
    user,
    novedades,
    loading,
    reload,
    modalVisible,
    setModalVisible,
    asunto,
    setAsunto,
    descripcion,
    setDescripcion,
    saving,
    openForm,
    enviar,
  } = useSoporteViewModel();


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

          <Text style={styles.headerTitle}>Soporte</Text>

          <View style={styles.headerRight} />
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="lock-closed-outline" size={40} color="#8B63B7" />
          </View>

          <Text style={styles.emptyTitle}>Inicia sesión</Text>

          <Text style={styles.emptyText}>
            Necesitas una cuenta para enviar o ver tus reportes.
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

        <Text style={styles.headerTitle}>Soporte</Text>

        <TouchableOpacity style={styles.headerRight} onPress={reload}>
          <Ionicons name="refresh" size={20} color="#493275" />
        </TouchableOpacity>

      </View>


      {loading && (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      )}


      {!loading && novedades.length === 0 && (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="chatbubble-ellipses-outline" size={40} color="#8B63B7" />
          </View>

          <Text style={styles.emptyTitle}>No tienes reportes</Text>

          <Text style={styles.emptyText}>
            ¿Tienes un problema con un pedido o quieres avisarnos algo?
            Toca el botón + para enviarnos un reporte.
          </Text>
        </View>
      )}


      {!loading && novedades.length > 0 && (

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {novedades.map((novedad) => (

            <View key={novedad.id} style={styles.card}>

              <View style={styles.cardHeader}>

                <Text style={styles.asunto}>{novedad.asunto}</Text>

                <View style={[styles.badge, { backgroundColor: ESTADO_COLORS[novedad.estado] }]}>
                  <Text style={styles.badgeText}>{ESTADO_LABELS[novedad.estado]}</Text>
                </View>

              </View>

              <Text style={styles.descripcion}>{novedad.descripcion}</Text>

              <Text style={[styles.descripcion, { fontSize: 11, color: '#A99CB8' }]}>
                {formatFecha(novedad.fechaCreacion)}
              </Text>

              {!!novedad.respuesta && (
                <View style={styles.respuestaBox}>
                  <Text style={styles.respuestaLabel}>Respuesta de NatyMoon</Text>
                  <Text style={styles.respuestaText}>{novedad.respuesta}</Text>
                </View>
              )}

            </View>

          ))}

        </ScrollView>

      )}


      <TouchableOpacity style={styles.fab} onPress={openForm}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>


      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>

            <ScrollView showsVerticalScrollIndicator={false}>

              <Text style={styles.modalTitle}>Enviar un reporte</Text>

              <Text style={styles.inputLabel}>Asunto</Text>
              <TextInput
                style={styles.input}
                value={asunto}
                onChangeText={setAsunto}
                placeholder="Ej: Producto llegó dañado"
              />

              <Text style={styles.inputLabel}>Descripción</Text>
              <TextInput
                style={[styles.input, { minHeight: 100, textAlignVertical: 'top' }]}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="Cuéntanos qué pasó con el mayor detalle posible"
                multiline
              />

              <TouchableOpacity
                style={[styles.primaryButton, saving && { opacity: 0.6 }]}
                onPress={enviar}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Enviar reporte</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>

            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
};


export default Soporte;
