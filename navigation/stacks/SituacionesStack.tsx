import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetalleSituacionScreen from '../../screens/situaciones/DetalleSituacionScreen';
import MisSituacionesScreen from '../../screens/situaciones/MisSituacionesScreen';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

export default function SituacionesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen
                name="MisSituacionesScreen"
                component={MisSituacionesScreen}
                options={{ title: '📋 Mis Situaciones' }}
            />
            <Stack.Screen
                name="DetalleSituacionScreen"
                component={DetalleSituacionScreen}
                options={({ navigation }) => ({
                    title: '📝 Detalle de Situación',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
                            <Icon name="arrow-left" size={24} color="#007AFF" />
                        </Pressable>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}
