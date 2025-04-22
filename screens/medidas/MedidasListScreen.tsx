import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, ActivityIndicator } from "react-native";
import { obtenerMedidasPreventivas } from "../../services/medidasService";
import { MedidaPreventiva } from "../../types/medidas/MedidaPreventiva";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { MedidasStackParamList } from "../../types/navigation/PublicDrawerParamList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MedidasListScreen() {
    const [medidas, setMedidas] = useState<MedidaPreventiva[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NativeStackNavigationProp<MedidasStackParamList>>();

    useEffect(() => {
        const fetch = async () => {
            const res = await obtenerMedidasPreventivas();
            if (res.exito) setMedidas(res.datos);
            setLoading(false);
        };
        fetch();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Icon name="shield-alert-outline" size={40} color="#007AFF" />
                <Text className="text-lg mt-4 text-gray-600">Cargando medidas preventivas...</Text>
                <ActivityIndicator size="large" color="#007AFF" className="mt-4" />
            </View>
        );
    }

    return (
        <ScrollView className="bg-white px-4 py-6">
            {medidas.map((m) => (
                <Pressable
                    key={m.id}
                    className="bg-white mb-5 p-4 rounded-2xl shadow-md border border-gray-100"
                    onPress={() => navigation.navigate("DetalleMedida", m)}
                >
                    <View className="w-full h-48 mb-3 overflow-hidden rounded-xl">
                        <Image
                            source={{ uri: m.foto }}
                            style={{ width: "100%", height: 192, borderRadius: 12 }}
                            contentFit="cover"
                            transition={300}
                            autoplay
                        />
                    </View>

                    <View className="flex-row items-center mb-1">
                        <Icon name="alert-circle-outline" size={22} color="#EF4444" />
                        <Text className="text-lg font-bold ml-2 text-gray-800">{m.titulo}</Text>
                    </View>

                    <Text className="text-gray-600 text-sm mt-1">
                        {m.descripcion.slice(0, 100)}...
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}
