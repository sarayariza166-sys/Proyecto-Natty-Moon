import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import styles from './styles';
import RegisterViewModel from './ViewModel';

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

const RegisterScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    acceptedTerms,
    setAcceptedTerms,
    loading,
    register,
  } = RegisterViewModel();

  const handleRegister = async () => {
    const success = await register();

    // Igual que en Login: si es ADMIN/EMPLEADO, App.tsx cambia de
    // navigator solo. Si es un usuario normal, esto lo regresa a la
    // pantalla donde estaba antes de entrar a Registro.
    if (success && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.openDrawer()
          }
        >
          <Text style={styles.menu}>
            ☰
          </Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>

          <Text style={styles.logoText}>
            🌙 Nattymoon
          </Text>

        </View>

        <View style={styles.headerIcons}>

          <Text style={styles.icon}>
            ⌕
          </Text>

          <Text style={styles.icon}>
            ♡
          </Text>

          <Text style={styles.icon}>
            ♧
          </Text>

        </View>

      </View>

      <View style={styles.banner}>

        <View style={styles.titleContainer}>

          <Text style={styles.title}>
            Regístrate en{'\n'}
            NattyMoon
          </Text>

          <Text style={styles.heart}>
            ♡
          </Text>

        </View>

        <View style={styles.registerImage}>

          <Text style={{ fontSize: 24, fontWeight: '800', color: '#493275', textAlign: 'center' }}>
            Natymoon
          </Text>

        </View>

        <Text style={styles.sparkle1}>
          ✦
        </Text>

        <Text style={styles.sparkle2}>
          ✦
        </Text>

        <Text style={styles.sparkle3}>
          ✦
        </Text>

      </View>

      <View style={styles.form}>

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            ♙
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            placeholderTextColor="#82758F"
            value={name}
            onChangeText={setName}
          />

        </View>

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            ♙
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#82758F"
            value={lastName}
            onChangeText={setLastName}
          />

        </View>

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            ✉
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#82758F"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

        </View>

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            ☏
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#82758F"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

        </View>

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            🔒
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#82758F"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showText}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            🔒
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#82758F"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.showText}>
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.termsContainer}>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() =>
              setAcceptedTerms(
                !acceptedTerms
              )
            }
          >

            {acceptedTerms && (
              <Text style={styles.check}>
                ✓
              </Text>
            )}

          </TouchableOpacity>

          <Text style={styles.terms}>
            Acepto los términos y condiciones
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >

          <Text style={styles.buttonText}>
            {loading
              ? 'CREANDO...'
              : 'CREAR CUENTA'}
          </Text>

          <Text style={styles.buttonStar}>
            ✦
          </Text>

        </TouchableOpacity>

        <View style={styles.loginContainer}>

          <Text style={styles.loginText}>
            ¿Ya tienes cuenta?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login')
            }
          >
            <Text style={styles.loginLink}>
              Inicia sesión aquí
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </ScrollView>
  );
};

export default RegisterScreen;
