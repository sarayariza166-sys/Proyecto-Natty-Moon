import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, useAuth } from './src/Presentation/context/AuthContext';

import ClienteNavigator from './src/Presentation/navigation/ClienteNavigator';
import AdminEmpleadoNavigator from './src/Presentation/navigation/AdminEmpleadoNavigator';

// Decide, según el rol del usuario logueado, qué árbol de navegación
// mostrar. Esta es la separación pedida:
// - ADMIN / EMPLEADO -> AdminEmpleadoNavigator (panel de administración)
// - USER o sin sesión -> ClienteNavigator (la tienda)
const RootNavigator = () => {

  const { isStaff, isLoadingSession } = useAuth();

  if (isLoadingSession) {
    // Mientras se restaura la sesión guardada no mostramos nada
    // (o se puede reemplazar por un splash screen).
    return null;
  }

  return isStaff
    ? <AdminEmpleadoNavigator />
    : <ClienteNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
