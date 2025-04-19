import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { recuperarContrasena } from '../../services/authService';

export default function RecoverPasswordScreen() {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!cedula.trim() || !correo.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const res = await recuperarContrasena(cedula, correo);
      Alert.alert('Recuperación', res.mensaje);
      if (res.exito) {
        setTimeout(() => navigation.goBack(), 1000);
      }
    } catch (e) {
      Alert.alert('Error', 'Hubo un problema al recuperar la contraseña.');
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center bg-white px-6">
        <Text className="mb-6 text-center text-2xl font-bold">Recuperar Contraseña</Text>

        <Text className="mb-1">Cédula</Text>
        <TextInput
          value={cedula}
          onChangeText={setCedula}
          placeholder="Ej: 00112345678"
          keyboardType="numeric"
          className="mb-4 rounded border border-gray-300 px-3 py-2"
        />

        <Text className="mb-1">Correo electrónico</Text>
        <TextInput
          value={correo}
          onChangeText={setCorreo}
          placeholder="Ej: ejemplo@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          className="mb-6 rounded border border-gray-300 px-3 py-2"
        />

        <Pressable
          onPress={handleSubmit}
          className="mb-3 items-center rounded bg-green-600 py-3"
          disabled={loading}>
          <Text className="font-bold text-white">
            {loading ? 'Enviando...' : 'Recuperar Contraseña'}
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} className="items-center">
          <Text className="text-blue-500">← Volver al login</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}
