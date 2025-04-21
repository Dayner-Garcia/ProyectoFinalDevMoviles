import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlberguesListScreen from '../../screens/albergues/AlberguesListScreen';
import AlbergueDetailScreen from '../../screens/albergues/AlbergueDetailScreen';
import AlberguesMapScreen from '../../screens/albergues/AlberguesMapScreen';
import { AlberguesStackParamList } from '../../types/navigation/PublicDrawerParamList';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator<AlberguesStackParamList>();

export default function AlberguesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen
                name="ListaAlbergues"
                component={AlberguesListScreen}
                options={{ title: '🏠 Albergues', headerBackVisible: false }}
            />
            <Stack.Screen
                name="MapaAlbergues"
                component={AlberguesMapScreen}
                options={{ title: '🗺️ Mapa de Albergues' }}
            />
            <Stack.Screen
                name="DetalleAlbergue"
                component={AlbergueDetailScreen}
                options={({ route, navigation }) => {
                    const from = route.params?.from;
                    return {
                        title: '📍 Detalle del Albergue',
                        headerLeft: () =>
                            from ? (
                                <Pressable
                                    onPress={() =>
                                        from === 'MapaAlbergues'
                                            ? navigation.replace('MapaAlbergues')
                                            : navigation.navigate('ListaAlbergues')
                                    }
                                    style={{ paddingHorizontal: 10 }}
                                >
                                    <Icon name="arrow-left" size={24} color="#007AFF" />
                                </Pressable>
                            ) : undefined,
                    };
                }}
            />
        </Stack.Navigator>
    );
}
