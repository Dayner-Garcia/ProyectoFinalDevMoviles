import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { PublicDrawerParamList } from '../../types/navigation/PublicDrawerParamList';

type NavigationType = DrawerNavigationProp<PublicDrawerParamList, 'Iniciar Sesión'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationType>();
  const { login } = useAuth();
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(cedula, clave);
    setLoading(false);

    if (result !== 'success') {
      Alert.alert('Error de inicio de sesión', result);
    } else {
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center bg-white px-6">
        <Text className="mb-6 text-center text-2xl font-bold text-blue-600">Iniciar Sesión</Text>

        <Text className="mb-1 font-semibold">Cédula</Text>
        <TextInput
          value={cedula}
          onChangeText={setCedula}
          placeholder="Ej: 00112345678"
          className="mb-4 rounded-lg border border-gray-300 px-4 py-2 shadow-md"
          keyboardType="numeric"
        />

        <Text className="mb-1 font-semibold">Contraseña</Text>
        <TextInput
          value={clave}
          onChangeText={setClave}
          placeholder="Contraseña"
          secureTextEntry
          className="mb-6 rounded-lg border border-gray-300 px-4 py-2 shadow-md"
        />

        <Pressable
          onPress={handleLogin}
          className="items-center rounded-lg bg-blue-600 py-3"
          disabled={loading}>
          <Text className="font-semibold text-white">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Recuperar Contraseña')} className="mt-4">
          <Text className="text-blue-500">¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}
