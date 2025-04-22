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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center bg-white px-6">
          <Text className="mb-8 text-center text-3xl font-bold text-blue-800">🔐 Iniciar Sesión</Text>

          <View className="mb-5">
            <Text className="mb-1 font-semibold text-gray-700">Cédula</Text>
            <View className="flex-row items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2">
              <Icon name="card-account-details-outline" size={20} color="#9CA3AF" />
              <TextInput
                  value={cedula}
                  onChangeText={setCedula}
                  placeholder="Ej: 00112345678"
                  className="ml-2 flex-1 text-base text-gray-800"
                  keyboardType="numeric"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-1 font-semibold text-gray-700">Contraseña</Text>
            <View className="flex-row items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2">
              <Icon name="lock-outline" size={20} color="#9CA3AF" />
              <TextInput
                  value={clave}
                  onChangeText={setClave}
                  placeholder="Contraseña"
                  secureTextEntry
                  className="ml-2 flex-1 text-base text-gray-800"
              />
            </View>
          </View>

          <Pressable
              onPress={handleLogin}
              className="items-center rounded-lg bg-blue-600 py-3"
              disabled={loading}
          >
            <Text className="font-semibold text-white text-lg">
              {loading ? 'Cargando...' : '🚪 Iniciar Sesión'}
            </Text>
          </Pressable>

          <Pressable
              onPress={() => navigation.navigate('Recuperar Contraseña')}
              className="mt-5 items-center"
          >
            <Text className="text-blue-500 underline">¿Olvidaste tu contraseña?</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
  );
}
