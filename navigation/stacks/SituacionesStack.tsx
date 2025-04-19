import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetalleSituacionScreen from '../../screens/situaciones/DetalleSituacionScreen';
import MisSituacionesScreen from '../../screens/situaciones/MisSituacionesScreen';

const Stack = createNativeStackNavigator();

export default function SituacionesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MisSituacionesScreen"
        component={MisSituacionesScreen}
        options={{ title: '📝' }}
      />
      <Stack.Screen
        name="DetalleSituacionScreen"
        component={DetalleSituacionScreen}
        options={{ title: 'Detalle de Situación' }}
      />
    </Stack.Navigator>
  );
}
