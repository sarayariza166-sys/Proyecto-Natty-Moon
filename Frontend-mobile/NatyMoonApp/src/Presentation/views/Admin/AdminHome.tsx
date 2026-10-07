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
import { ProductoService } from '../../../data/services/ProductoService';
import { OrdenAdminService } from '../../../data/services/OrdenAdminService';
import { UsuarioAdminService } from '../../../data/services/UsuarioAdminService';

import { adminStyles, ADMIN_COLORS } from './styles';


const AdminHome = () => {

  const navigation = useNavigation<any>();
  const { user, isAdmin } = useAuth();

  const [loading, setLoading] = useState(true);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);


  const load = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [productos, ordenes] = await Promise.all([
        ProductoService.listar(),
        OrdenAdminService.verTodasLasOrdenes(user.token),
      ]);

      setTotalProductos(productos.length);
      setTotalPedidos(ordenes.length);
      setPedidosPendientes(
        ordenes.filter((o) => o.estado === 'PENDIENTE').length
      );

      if (isAdmin) {
        const usuarios = await UsuarioAdminService.listar(user.token);
        setTotalUsuarios(usuarios.length);
      }

    } catch (error) {
      console.log('Error al cargar el dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );


  return (
    <View style={adminStyles.container}>

      {/* HEADER */}

      <View style={adminStyles.header}>

        <TouchableOpacity
          style={adminStyles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu-outline" size={27} color={ADMIN_COLORS.primaryDark} />
        </TouchableOpacity>

        <Text style={adminStyles.headerTitle}>Panel de administración</Text>

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

          <Text style={{ fontSize: 14, color: ADMIN_COLORS.textLight, marginBottom: 18 }}>
            {user?.email} · Rol: {user?.rol}
          </Text>

          <View style={adminStyles.statsRow}>

            <TouchableOpacity
              style={adminStyles.statCard}
              onPress={() => navigation.navigate('GestionProductos')}
            >
              <Ionicons name="shirt-outline" size={22} color={ADMIN_COLORS.primary} />
              <Text style={adminStyles.statValue}>{totalProductos}</Text>
              <Text style={adminStyles.statLabel}>Productos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={adminStyles.statCard}
              onPress={() => navigation.navigate('GestionPedidos')}
            >
              <Ionicons name="receipt-outline" size={22} color={ADMIN_COLORS.primary} />
              <Text style={adminStyles.statValue}>{totalPedidos}</Text>
              <Text style={adminStyles.statLabel}>Pedidos totales</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={adminStyles.statCard}
              onPress={() => navigation.navigate('GestionPedidos')}
            >
              <Ionicons name="time-outline" size={22} color={ADMIN_COLORS.warning} />
              <Text style={[adminStyles.statValue, { color: ADMIN_COLORS.warning }]}>
                {pedidosPendientes}
              </Text>
              <Text style={adminStyles.statLabel}>Pedidos pendientes</Text>
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                style={adminStyles.statCard}
                onPress={() => navigation.navigate('GestionUsuarios')}
              >
                <Ionicons name="people-outline" size={22} color={ADMIN_COLORS.primary} />
                <Text style={adminStyles.statValue}>{totalUsuarios}</Text>
                <Text style={adminStyles.statLabel}>Usuarios</Text>
              </TouchableOpacity>
            )}

          </View>

        </ScrollView>

      )}

    </View>
  );
};


export default AdminHome;
