import React from 'react';
import { Alert } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';

// Drawer compartido por ambos navigators (Cliente y Admin/Empleado).
// Agrega, debajo de las pantallas normales, un item de "Cerrar sesión"
// cuando hay un usuario logueado.
const CustomDrawerContent = (
  props: DrawerContentComponentProps
) => {

  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'NatyMoon',
      '¿Cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: () => logout() },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>

      <DrawerItemList {...props} />

      {user && (
        <DrawerItem
          label={`Cerrar sesión (${user.email})`}
          icon={({ color, size }) => (
            <Ionicons
              name="log-out-outline"
              size={size}
              color={color}
            />
          )}
          onPress={handleLogout}
        />
      )}

    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
