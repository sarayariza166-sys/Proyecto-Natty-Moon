import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useAuth } from '../context/AuthContext';
import CustomDrawerContent from './CustomDrawerContent';

import AdminHome from '../views/Admin/AdminHome';
import GestionProductos from '../views/Admin/GestionProductos';
import GestionCategorias from '../views/Admin/GestionCategorias';
import GestionPedidos from '../views/Admin/GestionPedidos';
import GestionUsuarios from '../views/Admin/GestionUsuarios';
import GestionCupones from '../views/Admin/GestionCupones';
import Reportes from '../views/Admin/Reportes';
import GestionNovedades from '../views/Admin/GestionNovedades';

const Drawer = createDrawerNavigator();

const AdminEmpleadoNavigator = () => {

  const { isAdmin } = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="AdminHome"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="AdminHome"
        component={AdminHome}
        options={{ title: 'Inicio' }}
      />

      <Drawer.Screen
        name="GestionProductos"
        component={GestionProductos}
        options={{ title: 'Productos' }}
      />

      <Drawer.Screen
        name="GestionCategorias"
        component={GestionCategorias}
        options={{ title: 'Catálogos' }}
      />

      <Drawer.Screen
        name="GestionPedidos"
        component={GestionPedidos}
        options={{ title: 'Pedidos' }}
      />

      <Drawer.Screen
        name="GestionCupones"
        component={GestionCupones}
        options={{ title: 'Cupones' }}
      />

      <Drawer.Screen
        name="Reportes"
        component={Reportes}
        options={{ title: 'Reportes' }}
      />

      <Drawer.Screen
        name="GestionNovedades"
        component={GestionNovedades}
        options={{ title: 'Reportes de usuarios' }}
      />

      <Drawer.Screen
        name="GestionUsuarios"
        component={GestionUsuarios}
        options={{
          title: 'Usuarios',
          drawerItemStyle: {
            display: isAdmin ? 'flex' : 'none',
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminEmpleadoNavigator;
