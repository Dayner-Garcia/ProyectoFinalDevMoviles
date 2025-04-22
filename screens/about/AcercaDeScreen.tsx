import { Linking, Pressable, ScrollView, Text, View, Image } from "react-native";
import { integrantes } from "../../types/Integrantes/integrantesDetails";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function AcercaDeScreen() {
    return (
        <ScrollView className="bg-white px-4 py-8">
            <Text className="text-2xl font-bold text-center text-blue-900 mb-8">
                👨‍💻 Sobre los Creadores
            </Text>

            {integrantes.map((p, index) => (
                <View
                    key={index}
                    className="bg-gray-100 px-5 py-6 rounded-2xl mb-6 shadow-md items-center"
                >
                    <Image
                        source={p.imagen}
                        className="w-28 h-28 rounded-full mb-4 border-4 border-blue-200"
                        resizeMode="cover"
                    />

                    <Text className="text-xl font-semibold text-center text-gray-800">
                        {p.nombre}
                    </Text>
                    <Text className="text-gray-500 mb-4 italic text-center">{p.rol}</Text>

                    <View className="flex-row items-center mb-2">
                        <MaterialCommunityIcons name="phone" size={20} color="#3B82F6" />
                        <Pressable onPress={() => Linking.openURL(`tel:${p.telefono}`)}>
                            <Text className="text-blue-600 ml-2">{p.telefono}</Text>
                        </Pressable>
                    </View>

                    <View className="flex-row items-center">
                        <FontAwesome name="telegram" size={20} color="#3B82F6" />
                        <Pressable onPress={() => Linking.openURL(`https://t.me/${p.telegram}`)}>
                            <Text className="text-blue-600 ml-2">@{p.telegram}</Text>
                        </Pressable>
                    </View>
                </View>
            ))}

            <Text className="text-center text-sm text-gray-400 mt-8 px-6">
                Esta aplicación fue desarrollada como parte del proyecto final de introducción al desarrollo de aplicaciones móviles para ITLA C1-2025.
            </Text>
        </ScrollView>
    );
}
