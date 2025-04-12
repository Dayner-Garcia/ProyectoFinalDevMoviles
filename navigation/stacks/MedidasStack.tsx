import MedidaDetailScreen from "../../screens/medidas/MedidaDetailScreen";
import MedidasListScreen from "../../screens/medidas/MedidasListScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Ionicons} from '@expo/vector-icons';
import {Pressable} from "react-native";
import {MedidasStackParamList} from "../../types/navigation/PublicDrawerParamList";

const Stack = createNativeStackNavigator<MedidasStackParamList>();

export default function MedidasStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListaMedidas" component={MedidasListScreen} options={{title: "Medidas Preventivas"}}/>
            <Stack.Screen
                name="DetalleMedida" component={MedidaDetailScreen} options={({navigation}) => ({title: "Detalle de Medida",
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()} style={{paddingHorizontal: 10}}>
                            <Ionicons name="arrow-back" size={24} color="#007AFF"/>
                        </Pressable>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}