import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { MedidasStackParamList } from "../../types/navigation/PublicDrawerParamList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MedidaDetailScreen() {
    const { params } = useRoute<RouteProp<MedidasStackParamList, "DetalleMedida">>();

    return (
        <ScrollView className="bg-white px-5 py-6">
            <Text className="text-2xl font-bold text-blue-900 text-center mb-4">
                🛡️ {params.titulo}
            </Text>

            <View className="w-full h-56 mb-6 rounded-2xl overflow-hidden shadow-md border border-gray-200">
                <Image
                    source={{ uri: params.foto }}
                    style={{ width: '100%', height: 224, borderRadius: 16 }}
                    contentFit="cover"
                    transition={300}
                    autoplay
                />
            </View>

            <View className="flex-row items-start mb-3">
                <Icon name="text-long" size={22} color="#3B82F6" />
                <Text className="ml-2 text-base text-gray-800 flex-1 leading-relaxed">
                    {params.descripcion}
                </Text>
            </View>
        </ScrollView>
    );
}
