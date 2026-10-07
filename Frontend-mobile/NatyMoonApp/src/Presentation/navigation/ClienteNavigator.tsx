import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useAuth } from '../context/AuthContext';
import CustomDrawerContent from './CustomDrawerContent';

import Home from '../views/Home/Home';
import Catalogo from '../views/Catalogo/Catalogo';
import Buscar from '../views/Buscar/Buscar';
import DetalleProducto from '../views/DetalleProducto/DetalleProducto';
import Carrito from '../views/Carrito/Carrito';
import Checkout from '../views/Checkout/Checkout';
import Pedidos from '../views/Pedidos/Pedidos';
import Login from '../views/login/Login';
import Register from '../views/Registro/Register';
import Cupones from '../views/Cupones/Cupones';
import Soporte from '../views/Soporte/Soporte';

const Drawer = createDrawerNavigator();

const ClienteNavigator = () => {

  const { user } = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Catalogo"
        component={Catalogo}
        options={{ unmountOnBlur: true }}
      />

      <Drawer.Screen
        name="Buscar"
        component={Buscar}
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name="DetalleProducto"
        component={DetalleProducto}
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name="Cupones"
        component={Cupones}
        options={{
          drawerItemStyle: {
            display: user ? 'flex' : 'none',
          },
        }}
      />

      <Drawer.Screen
        name="Soporte"
        component={Soporte}
        options={{
          drawerItemStyle: {
            display: user ? 'flex' : 'none',
          },
        }}
      />

      <Drawer.Screen name="Carrito" component={Carrito} />

      <Drawer.Screen
        name="Checkout"
        component={Checkout}
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          title: 'Mis pedidos',
          drawerItemStyle: {
            display: user ? 'flex' : 'none',
          },
        }}
      />

      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name="Register"
        component={Register}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
};

export default ClienteNavigator;
