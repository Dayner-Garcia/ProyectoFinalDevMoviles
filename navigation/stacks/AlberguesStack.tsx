import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlberguesListScreen from '../../screens/albergues/AlberguesListScreen';
import AlbergueDetailScreen from '../../screens/albergues/AlbergueDetailScreen';
import AlberguesMapScreen from '../../screens/albergues/AlberguesMapScreen';
import { AlberguesStackParamList } from '../../types/navigation/PublicDrawerParamList';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator<AlberguesStackParamList>();

export default function AlberguesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaAlbergues"
        component={AlberguesListScreen}
        options={{ title: 'Albergues', headerBackVisible: false }}
      />
      <Stack.Screen
        name="MapaAlbergues"
        component={AlberguesMapScreen}
        options={{ title: 'Mapa de Albergues' }}
      />
      <Stack.Screen
        name="DetalleAlbergue"
        component={AlbergueDetailScreen}
        options={({ route, navigation }) => {
          const from = route.params?.from;
          return {
            title: 'Detalle del Albergue',
            headerLeft: from
              ? () => (
                  <Text
                    style={{
                      paddingLeft: 15,
                      color: '#007AFF',
                      fontWeight: '600',
                    }}
                    onPress={() => {
                      if (from === 'MapaAlbergues') {
                        navigation.replace('MapaAlbergues');
                      } else {
                        navigation.navigate('ListaAlbergues');
                      }
                    }}>
                    ← Volver
                  </Text>
                )
              : undefined,
          };
        }}
      />
    </Stack.Navigator>
  );
}
