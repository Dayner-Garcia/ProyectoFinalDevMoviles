import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";

import { Image } from 'expo-image';
import {MedidasStackParamList} from "../../types/navigation/PublicDrawerParamList";

export default function MedidaDetailScreen() {
    const { params } = useRoute<RouteProp<MedidasStackParamList, "DetalleMedida">>();

    return (
        <ScrollView className="bg-white p-5">
            <View className="w-full h-56 mb-4 rounded-xl overflow-hidden">
                <Image
                    source={{ uri: params.foto }}
                    style={{ width: '100%', height: 224, borderRadius: 12, marginBottom: 16 }}
                    contentFit="cover"
                    transition={300}
                    autoplay
                />
            </View>
            <Text className="text-2xl font-bold mb-3">{params.titulo}</Text>
            <Text className="text-base text-gray-700">{params.descripcion}</Text>
        </ScrollView>
    );
}
