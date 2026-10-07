import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../context/AuthContext';

const REMEMBER_KEY = '@natymoon:remembered_credentials';

const LoginViewModel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    // Al abrir la pantalla de login (por ejemplo, justo después de cerrar
    // sesión), si había credenciales guardadas las precargamos en los
    // campos por comodidad, PERO el checkbox "Recordarme" siempre arranca
    // desmarcado: que haya datos guardados de una vez anterior no debe
    // hacer que se sigan guardando solos si el usuario no lo pide de nuevo.
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(REMEMBER_KEY);
                if (stored) {
                    const { email: savedEmail, password: savedPassword } = JSON.parse(stored);
                    setEmail(savedEmail ?? '');
                    setPassword(savedPassword ?? '');
                }
            } catch (error) {
                console.log('Error al leer credenciales guardadas:', error);
            }
        })();
    }, []);

    // Devuelve true si el login fue exitoso, para que la vista
    // decida si navega o no.
    const handleLogin = async (): Promise<boolean> => {
        if (!email || !password) {
            Alert.alert(
                'NatyMoon',
                'Por favor completa todos los campos.'
            );
            return false;
        }

        setLoading(true);

        try {
            await login(email, password);

            // Guardamos (o borramos) las credenciales según el checkbox
            // "Recordarme". Esto vive aparte de la sesión: aunque el
            // usuario cierre sesión, el login la sigue recordando.
            if (remember) {
                await AsyncStorage.setItem(
                    REMEMBER_KEY,
                    JSON.stringify({ email, password })
                );
            } else {
                await AsyncStorage.removeItem(REMEMBER_KEY);
            }

            return true;

        } catch (error: any) {
            // El backend ya distingue credenciales inválidas de otros
            // errores; este mensaje llega listo para mostrar tal cual.
            Alert.alert(
                'NatyMoon',
                error?.message || 'Error en el correo o la contraseña.'
            );
            return false;

        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        remember,
        showPassword,
        loading,
        setEmail,
        setPassword,
        setRemember,
        setShowPassword,
        login: handleLogin,
    };
};

export default LoginViewModel;
