import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const RegisterViewModel = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const setPhoneValidated = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, '').slice(0, 10));
  };

  const EMAIL_GMAIL = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const doRegister = async (): Promise<boolean> => {

    if (!name || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('NatyMoon', 'Completa todos los campos.');
      return false;
    }

    if (!EMAIL_GMAIL.test(email.trim().toLowerCase())) {
      Alert.alert('NatyMoon', 'Correo inválido.');
      return false;
    }

    if (phone.length !== 10) {
      Alert.alert('NatyMoon', 'El teléfono debe tener 10 números.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('NatyMoon', 'La contraseña debe tener mínimo 6 caracteres.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('NatyMoon', 'Las contraseñas no coinciden.');
      return false;
    }

    if (!acceptedTerms) {
      Alert.alert('NatyMoon', 'Debes aceptar los términos y condiciones.');
      return false;
    }

    setLoading(true);

    try {
      await register(name.trim(), lastName.trim(), email.trim().toLowerCase(), password, phone.trim());
      return true;
    } catch (error: any) {
      Alert.alert('NatyMoon', error?.message || 'No se pudo crear la cuenta.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone: setPhoneValidated,
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
    register: doRegister,
  };
};

export default RegisterViewModel;
