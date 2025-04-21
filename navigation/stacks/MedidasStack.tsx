import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedidaDetailScreen from '../../screens/medidas/MedidaDetailScreen';
import MedidasListScreen from '../../screens/medidas/MedidasListScreen';
import { Pressable } from 'react-native';
import { MedidasStackParamList } from '../../types/navigation/PublicDrawerParamList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator<MedidasStackParamList>();

export default function MedidasStack() {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen
                name="ListaMedidas"
                component={MedidasListScreen}
                options={{ title: '🛡️ Medidas Preventivas' }}
            />
            <Stack.Screen
                name="DetalleMedida"
                component={MedidaDetailScreen}
                options={({ navigation }) => ({
                    title: '📋 Detalle de Medida',
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
