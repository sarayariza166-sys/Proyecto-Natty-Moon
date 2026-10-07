import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import styles from './Styles';
import LoginViewModel from './ViewModel';

type DrawerParamList = {
  Home: undefined;
  Catalogo: undefined;
  Buscar: undefined;
  DetalleProducto: undefined;
  Carrito: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp =
  DrawerNavigationProp<DrawerParamList>;

const Login = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const {
    email,
    password,
    remember,
    showPassword,
    setEmail,
    setPassword,
    setRemember,
    setShowPassword,
    login,
  } = LoginViewModel();

  const handleLogin = async () => {
    const success = await login();

    // Si es ADMIN/EMPLEADO, App.tsx cambia de navigator automáticamente
    // (este goBack no alcanza a notarse). Si es un usuario normal, esto
    // lo regresa a la pantalla donde estaba antes de entrar a Login
    // (Home, Catálogo, Carrito, etc.) en vez de mandarlo siempre a Home.
    if (success && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCE9F2"
      />

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons
            name="menu-outline"
            size={29}
            color="#3D286D"
          />
        </TouchableOpacity>

        <View style={styles.logoContainer}>

          <View style={styles.logoMoon}>
            <Text style={styles.logoMoonText}>
              🌙
            </Text>
          </View>

          <Text style={styles.logoText}>
            Nattymoon
          </Text>

        </View>

        <View style={styles.headerIcons}>

          <Ionicons
            name="search-outline"
            size={22}
            color="#3D286D"
          />

          <Ionicons
            name="heart-outline"
            size={22}
            color="#3D286D"
          />

          <Ionicons
            name="bag-handle-outline"
            size={23}
            color="#3D286D"
          />

        </View>

      </View>

      <View style={styles.background}>

        <View style={styles.loginCard}>

          <View style={styles.cloudTop}>
            <Text style={styles.cloudText}>
              ☁️
            </Text>
          </View>

          <View style={styles.titleArea}>

            <Text style={styles.title}>
              Inicia Sesión
            </Text>

            <Text style={styles.title}>
              con NattyMoon
            </Text>

          </View>

          <View style={styles.moonIllustration}>

            <Text style={styles.brandText}>
              Natymoon
            </Text>

            <Text style={styles.starOne}>
              ★
            </Text>

            <Text style={styles.starTwo}>
              ★
            </Text>

          </View>

          <View style={styles.inputContainer}>

            <Ionicons
              name="mail-outline"
              size={18}
              color="#8B849A"
            />

            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              placeholderTextColor="#8B849A"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

          </View>

          <View style={styles.inputContainer}>

            <Ionicons
              name="lock-closed-outline"
              size={18}
              color="#8B849A"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#8B849A"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(!showPassword)
              }
            >
              <Text style={styles.showText}>
                {showPassword
                  ? 'Ocultar'
                  : 'Mostrar'}
              </Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() =>
              setRemember(!remember)
            }
          >

            <View
              style={[
                styles.checkbox,
                remember &&
                  styles.checkboxActive,
              ]}
            >
              {remember && (
                <Ionicons
                  name="checkmark"
                  size={15}
                  color="#FFFFFF"
                />
              )}
            </View>

            <Text style={styles.rememberText}>
              Recordarme
            </Text>

          </TouchableOpacity>

          {/* INICIAR SESIÓN */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              INICIAR SESIÓN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>

            <Text style={styles.registerText}>
              ¿No tienes cuenta?{' '}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Register')
              }
            >
              <Text style={styles.registerLink}>
                Regístrate aquí
              </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.cloudBottom}>
            <Text style={styles.cloudText}>
              ☁️
            </Text>
          </View>

        </View>

        <Text style={styles.bottomText}>
          ✦ Pijamas de la mejor calidad ✦
        </Text>

      </View>

    </View>
  );
};

export default Login;
