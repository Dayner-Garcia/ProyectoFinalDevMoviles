import { useEffect } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '../../context/AuthContext';

export default function LogoutScreen({ navigation }: any) {
  const { logout } = useAuth();

  useEffect(() => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
      { cancelable: false }
    );
  }, []);

  return null;
}
