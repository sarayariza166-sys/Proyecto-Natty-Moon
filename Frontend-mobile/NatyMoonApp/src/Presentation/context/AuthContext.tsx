import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginResponse } from '../../Domain/entities/LoginResponse';
import { LoginAuthUseCase } from '../../Domain/UseCases/auth/LoginAuth';
import { RegisterAuthUseCase } from '../../Domain/UseCases/auth/RegisterAuth';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { setUnauthorizedHandler } from '../../data/api/httpClient';

const STORAGE_KEY = '@natymoon:auth_user';

// Roles válidos que existen hoy en la tabla `rol` del backend.
export type Rol = 'ADMIN' | 'EMPLEADO' | 'USER';

type AuthContextType = {
  user: LoginResponse | null;
  isLoadingSession: boolean;

  // true para ADMIN o EMPLEADO -> deben ver el panel de administración.
  isStaff: boolean;

  // true solo para ADMIN -> ve secciones extra (ej. Gestión de Usuarios).
  isAdmin: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    telefono?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | undefined>(undefined);

const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginAuthUseCase(authRepository);
const registerUseCase = new RegisterAuthUseCase(authRepository);


// ==========================================
// PROVIDER
// ==========================================

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);


  // ========================================
  // RESTAURAR SESIÓN GUARDADA
  // ========================================

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (error) {
        console.log('Error al restaurar la sesión:', error);
      } finally {
        setIsLoadingSession(false);
      }
    })();
  }, []);


  // ========================================
  // LOGIN
  // ========================================

  const login = async (email: string, password: string) => {
    const result = await loginUseCase.execute(email, password);

    setUser(result);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(result)
    );
  };


  // ========================================
  // REGISTRO (deja logueado automáticamente)
  // ========================================

  const register = async (
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    telefono?: string
  ) => {
    const result = await registerUseCase.execute(
      nombre,
      apellido,
      email,
      password,
      telefono
    );

    setUser(result);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(result)
    );
  };


  // ========================================
  // LOGOUT
  // ========================================

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);


  // Si cualquier request al backend responde 401 con una sesión que
  // creíamos válida (token vencido, usuario eliminado, etc.), cerramos
  // sesión automáticamente para que la persona vuelva al login en vez
  // de quedarse viendo una pantalla rota.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
    });

    return () => setUnauthorizedHandler(null);
  }, [logout]);


  const isStaff =
    user?.rol === 'ADMIN' || user?.rol === 'EMPLEADO';

  const isAdmin =
    user?.rol === 'ADMIN';


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingSession,
        isStaff,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ==========================================
// HOOK
// ==========================================

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    );
  }

  return context;
};
