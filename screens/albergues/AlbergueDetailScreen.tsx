import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { AlberguesStackParamList } from "../../types/navigation/PublicDrawerParamList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AlbergueDetailScreen() {
    const { params } = useRoute<RouteProp<AlberguesStackParamList, "DetalleAlbergue">>();
    const albergue = params.albergue;

    return (
        <ScrollView className="bg-white px-6 py-6">
            <Text className="text-3xl font-bold text-blue-900 mb-4 text-center">
                🏠 {albergue.nombre || albergue.edificio}
            </Text>

            <View className="bg-gray-50 p-4 rounded-2xl shadow-sm border border-gray-200">
                <View className="flex-row items-center mb-3">
                    <Icon name="map-marker" size={20} color="#3B82F6" />
                    <Text className="ml-2 text-base text-gray-800">
                        {albergue.ciudad || albergue.provincia}
                    </Text>
                </View>

                {albergue.direccion && (
                    <View className="flex-row items-center mb-3">
                        <Icon name="home-outline" size={20} color="#3B82F6" />
                        <Text className="ml-2 text-base text-gray-800">
                            {albergue.direccion}
                        </Text>
                    </View>
                )}

                <View className="flex-row items-center mb-3">
                    <Icon name="phone" size={20} color="#3B82F6" />
                    <Text className="ml-2 text-base text-gray-800">
                        {albergue.telefono}
                    </Text>
                </View>

                <View className="flex-row items-center mb-3">
                    <Icon name="account" size={20} color="#3B82F6" />
                    <Text className="ml-2 text-base text-gray-800">
                        {albergue.coordinador || "N/D"}
                    </Text>
                </View>

                <View className="flex-row items-center mb-3">
                    <Icon name="account-group" size={20} color="#3B82F6" />
                    <Text className="ml-2 text-base text-gray-800">
                        {albergue.capacidad || "N/D"} personas
                    </Text>
                </View>

                <View className="flex-row items-center mt-2">
                    <Icon name="identifier" size={18} color="#9CA3AF" />
                    <Text className="ml-2 text-sm text-gray-500">
                        Código: {albergue.codigo || "N/D"}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
