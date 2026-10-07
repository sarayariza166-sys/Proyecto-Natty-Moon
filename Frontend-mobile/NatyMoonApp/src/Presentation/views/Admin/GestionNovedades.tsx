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
import { NovedadService } from '../../../data/services/NovedadService';
import { ESTADOS_NOVEDAD, EstadoNovedad, Novedad } from '../../../Domain/entities/Novedad';

import { adminStyles, ADMIN_COLORS } from './styles';


const ESTADO_COLORS: Record<string, string> = {
  ABIERTA: ADMIN_COLORS.warning,
  EN_PROCESO: '#4B80B1',
  RESUELTA: ADMIN_COLORS.success,
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


const GestionNovedades = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [seleccionada, setSeleccionada] = useState<Novedad | null>(null);
  const [respuesta, setRespuesta] = useState('');
  const [estado, setEstado] = useState<EstadoNovedad>('EN_PROCESO');
  const [saving, setSaving] = useState(false);


  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await NovedadService.listarTodas(user.token);
      setNovedades([...data].sort((a, b) => b.id - a.id));
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


  const openResponder = (novedad: Novedad) => {
    setSeleccionada(novedad);
    setRespuesta(novedad.respuesta ?? '');
    setEstado(novedad.estado === 'ABIERTA' ? 'EN_PROCESO' : novedad.estado);
    setModalVisible(true);
  };

  const handleResponder = async () => {
    if (!user || !seleccionada) return;

    if (!respuesta.trim()) {
      Alert.alert('NatyMoon', 'Escribe una respuesta.');
      return;
    }

    setSaving(true);

    try {
      await NovedadService.responder(seleccionada.id, estado, respuesta.trim(), user.token);
      setModalVisible(false);
      await load();
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo enviar la respuesta.');
    } finally {
      setSaving(false);
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

        <Text style={adminStyles.headerTitle}>Reportes de usuarios</Text>

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

          {novedades.length === 0 && (
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="chatbubble-ellipses-outline" size={40} color={ADMIN_COLORS.textLight} />
              <Text style={adminStyles.emptyText}>
                Todavía no hay reportes de usuarios.
              </Text>
            </View>
          )}

          {novedades.map((novedad) => (

            <TouchableOpacity
              key={novedad.id}
              style={adminStyles.card}
              activeOpacity={0.8}
              onPress={() => openResponder(novedad)}
            >

              <View style={adminStyles.cardInfo}>

                <Text style={adminStyles.cardTitle} numberOfLines={1}>
                  {novedad.asunto}
                </Text>

                <Text style={adminStyles.cardSubtitle} numberOfLines={1}>
                  {novedad.usuario.nombre} {novedad.usuario.apellido} · {novedad.usuario.email}
                </Text>

                <Text style={adminStyles.cardSubtitle} numberOfLines={2}>
                  {novedad.descripcion}
                </Text>

                <Text style={[adminStyles.cardSubtitle, { fontSize: 11 }]}>
                  {formatFecha(novedad.fechaCreacion)}
                </Text>

                <View
                  style={[
                    adminStyles.badge,
                    { backgroundColor: ESTADO_COLORS[novedad.estado] },
                  ]}
                >
                  <Text style={adminStyles.badgeText}>{ESTADO_LABELS[novedad.estado]}</Text>
                </View>

              </View>

              <Ionicons name="chevron-forward" size={20} color={ADMIN_COLORS.textLight} />

            </TouchableOpacity>

          ))}

        </ScrollView>

      )}


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
                {seleccionada?.asunto}
              </Text>

              <Text style={adminStyles.cardSubtitle}>
                {seleccionada?.usuario.nombre} {seleccionada?.usuario.apellido} · {seleccionada?.usuario.email}
              </Text>

              <Text style={[adminStyles.inputLabel]}>Descripción del usuario</Text>
              <Text style={adminStyles.cardSubtitle}>{seleccionada?.descripcion}</Text>

              <Text style={adminStyles.inputLabel}>Estado</Text>
              <View style={adminStyles.pickerRow}>
                {ESTADOS_NOVEDAD.map((e) => (
                  <TouchableOpacity
                    key={e}
                    style={[
                      adminStyles.pickerOption,
                      estado === e && adminStyles.pickerOptionSelected,
                    ]}
                    onPress={() => setEstado(e)}
                  >
                    <Text
                      style={[
                        adminStyles.pickerOptionText,
                        estado === e && adminStyles.pickerOptionTextSelected,
                      ]}
                    >
                      {ESTADO_LABELS[e]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={adminStyles.inputLabel}>Respuesta</Text>
              <TextInput
                style={[adminStyles.input, { minHeight: 100, textAlignVertical: 'top' }]}
                value={respuesta}
                onChangeText={setRespuesta}
                placeholder="Escribe la respuesta para el cliente"
                multiline
              />

              <TouchableOpacity
                style={[adminStyles.primaryButton, saving && { opacity: 0.6 }]}
                onPress={handleResponder}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={adminStyles.primaryButtonText}>Enviar respuesta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={adminStyles.secondaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={adminStyles.secondaryButtonText}>Cerrar</Text>
              </TouchableOpacity>

            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
};


export default GestionNovedades;
