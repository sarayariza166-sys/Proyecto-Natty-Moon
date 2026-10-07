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
import { UsuarioAdminService } from '../../../data/services/UsuarioAdminService';
import { UsuarioAdmin } from '../../../Domain/entities/UsuarioAdmin';

import { adminStyles, ADMIN_COLORS } from './styles';


const EMPTY_STAFF_FORM = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  telefono: '',
};

const GestionUsuarios = () => {

  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [rolNuevo, setRolNuevo] = useState<'ADMIN' | 'EMPLEADO'>('EMPLEADO');
  const [form, setForm] = useState(EMPTY_STAFF_FORM);
  const [saving, setSaving] = useState(false);


  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await UsuarioAdminService.listar(user.token);
      setUsuarios(data);
    } catch (error) {
      console.log('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );


  // ==========================================
  // ACTIVAR / DESACTIVAR
  // ==========================================

  const handleToggleEstado = async (u: UsuarioAdmin) => {
    if (!user) return;

    setUpdatingId(u.id);

    try {
      await UsuarioAdminService.cambiarEstado(u.id, !u.activo, user.token);
      setUsuarios((current) =>
        current.map((item) =>
          item.id === u.id ? { ...item, activo: !item.activo } : item
        )
      );
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo actualizar el estado.');
    } finally {
      setUpdatingId(null);
    }
  };


  // ==========================================
  // ELIMINAR
  // ==========================================

  const handleDelete = (u: UsuarioAdmin) => {
    if (user && u.id === Number(user.id)) {
      Alert.alert('NatyMoon', 'No puedes eliminar tu propia cuenta.');
      return;
    }

    Alert.alert(
      'Eliminar usuario',
      `¿Eliminar a "${u.nombre} ${u.apellido}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            try {
              await UsuarioAdminService.eliminar(u.id, user.token);
              await load();
            } catch (error: any) {
              Alert.alert('NatyMoon', error?.message || 'No se pudo eliminar.');
            }
          },
        },
      ]
    );
  };


  // ==========================================
  // CREAR STAFF (ADMIN / EMPLEADO)
  // ==========================================

  const openCreateStaff = () => {
    setForm(EMPTY_STAFF_FORM);
    setRolNuevo('EMPLEADO');
    setModalVisible(true);
  };

  const handleCrearStaff = async () => {
    if (!user) return;

    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim() || !form.password) {
      Alert.alert('NatyMoon', 'Completa nombre, apellido, email y contraseña.');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('NatyMoon', 'La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    setSaving(true);

    try {
      await UsuarioAdminService.crearStaff(
        {
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          email: form.email.trim(),
          password: form.password,
          telefono: form.telefono.trim() || undefined,
          rolNombre: rolNuevo,
        },
        user.token
      );

      setModalVisible(false);
      await load();
      Alert.alert('NatyMoon', `Cuenta de ${rolNuevo} creada correctamente.`);

    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo crear la cuenta.');
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

        <Text style={adminStyles.headerTitle}>Usuarios</Text>

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

          {usuarios.length === 0 && (
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="people-outline" size={40} color={ADMIN_COLORS.textLight} />
              <Text style={adminStyles.emptyText}>
                No hay usuarios registrados todavía.
              </Text>
            </View>
          )}

          {usuarios.map((u) => (

            <View key={u.id} style={adminStyles.card}>

              <View style={adminStyles.cardInfo}>

                <Text style={adminStyles.cardTitle} numberOfLines={1}>
                  {u.nombre} {u.apellido}
                </Text>

                <Text style={adminStyles.cardSubtitle} numberOfLines={1}>
                  {u.email}
                </Text>

                <Text style={adminStyles.cardSubtitle}>
                  Rol: {u.rol?.nombre || '—'}
                </Text>

                <View
                  style={[
                    adminStyles.badge,
                    {
                      backgroundColor: u.activo
                        ? ADMIN_COLORS.success
                        : ADMIN_COLORS.textLight,
                    },
                  ]}
                >
                  <Text style={adminStyles.badgeText}>
                    {u.activo ? 'Activo' : 'Inactivo'}
                  </Text>
                </View>

                <View style={adminStyles.cardActions}>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => handleToggleEstado(u)}
                    disabled={updatingId === u.id}
                  >
                    {updatingId === u.id ? (
                      <ActivityIndicator size="small" color={ADMIN_COLORS.primary} />
                    ) : (
                      <Ionicons
                        name={u.activo ? 'lock-closed-outline' : 'lock-open-outline'}
                        size={16}
                        color={ADMIN_COLORS.primary}
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={adminStyles.iconButton}
                    onPress={() => handleDelete(u)}
                  >
                    <Ionicons name="trash-outline" size={16} color={ADMIN_COLORS.danger} />
                  </TouchableOpacity>

                </View>

              </View>

            </View>

          ))}

        </ScrollView>

      )}


      {/* Solo para crear ADMIN/EMPLEADO. El registro público siempre crea USER. */}
      <TouchableOpacity style={adminStyles.fab} onPress={openCreateStaff}>
        <Ionicons name="person-add-outline" size={24} color="#FFFFFF" />
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
                Nueva cuenta de staff
              </Text>

              <Text style={adminStyles.inputLabel}>Rol</Text>
              <View style={adminStyles.pickerRow}>
                {(['EMPLEADO', 'ADMIN'] as const).map((rol) => (
                  <TouchableOpacity
                    key={rol}
                    style={[
                      adminStyles.pickerOption,
                      rolNuevo === rol && adminStyles.pickerOptionSelected,
                    ]}
                    onPress={() => setRolNuevo(rol)}
                  >
                    <Text
                      style={[
                        adminStyles.pickerOptionText,
                        rolNuevo === rol && adminStyles.pickerOptionTextSelected,
                      ]}
                    >
                      {rol}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={adminStyles.inputLabel}>Nombre</Text>
              <TextInput
                style={adminStyles.input}
                value={form.nombre}
                onChangeText={(v) => setForm({ ...form, nombre: v })}
                placeholder="María"
              />

              <Text style={adminStyles.inputLabel}>Apellido</Text>
              <TextInput
                style={adminStyles.input}
                value={form.apellido}
                onChangeText={(v) => setForm({ ...form, apellido: v })}
                placeholder="Gómez"
              />

              <Text style={adminStyles.inputLabel}>Email</Text>
              <TextInput
                style={adminStyles.input}
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
                placeholder="maria@natymoon.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Text style={adminStyles.inputLabel}>Contraseña</Text>
              <TextInput
                style={adminStyles.input}
                value={form.password}
                onChangeText={(v) => setForm({ ...form, password: v })}
                placeholder="Mínimo 6 caracteres"
                secureTextEntry
              />

              <Text style={adminStyles.inputLabel}>Teléfono (opcional)</Text>
              <TextInput
                style={adminStyles.input}
                value={form.telefono}
                onChangeText={(v) => setForm({ ...form, telefono: v })}
                placeholder="3001234567"
                keyboardType="phone-pad"
              />

              <TouchableOpacity
                style={[adminStyles.primaryButton, saving && { opacity: 0.6 }]}
                onPress={handleCrearStaff}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={adminStyles.primaryButtonText}>
                    Crear cuenta {rolNuevo}
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


export default GestionUsuarios;
