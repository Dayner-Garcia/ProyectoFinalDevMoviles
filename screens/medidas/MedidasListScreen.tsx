import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, ActivityIndicator } from "react-native";
import { obtenerMedidasPreventivas } from "../../services/medidasService";
import { MedidaPreventiva } from "../../types/medidas/MedidaPreventiva";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from 'expo-image';
import {MedidasStackParamList} from "../../types/navigation/PublicDrawerParamList";

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
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView className="bg-white px-4 py-6">
            {medidas.map((m) => (
                <Pressable
                    key={m.id}
                    className="bg-gray-100 mb-4 p-4 rounded-xl shadow-sm"
                    onPress={() => navigation.navigate("DetalleMedida", m)}
                >
                    <View className="w-full h-48 mb-3 overflow-hidden rounded-xl">
                        <Image
                            source={{ uri: m.foto }}
                            style={{ width: '100%', height: 192, borderRadius: 12, marginBottom: 12 }}
                            contentFit="cover"
                            transition={300}
                            autoplay
                        />
                    </View>
                    <Text className="text-xl font-bold mb-1">{m.titulo}</Text>
                    <Text className="text-gray-600">{m.descripcion.slice(0, 100)}...</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}
