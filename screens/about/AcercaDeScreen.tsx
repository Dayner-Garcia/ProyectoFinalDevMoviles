import {Linking, Pressable, ScrollView, Text, View, Image} from "react-native";
import {integrantes} from "../../types/Integrantes/integrantesDetails";



export default function AcercaDeScreen() {
    return (
        <ScrollView className="bg-white px-6 py-8">
            <Text className="text-2xl font-bold text-center mb-6">Sobre los Creadores</Text>

            {integrantes.map((p, index) => (
                <View
                    key={index}
                    className="bg-gray-100 p-4 rounded-2xl mb-6 shadow-sm items-center"
                >
                    <Image
                        source={p.imagen}
                        className="w-28 h-28 rounded-full mb-4"
                        resizeMode="cover"
                    />
                    <Text className="text-xl font-semibold text-center">{p.nombre}</Text>
                    <Text className="text-gray-600 mb-3 text-center">{p.rol}</Text>

                    <Pressable
                        onPress={() => Linking.openURL(`tel:${p.telefono}`)}
                        className="mb-2"
                    >
                        <Text className="text-blue-500">📞 {p.telefono}</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => Linking.openURL(`https://t.me/${p.telegram}`)}
                    >
                        <Text className="text-blue-500">💬 @{p.telegram}</Text>
                    </Pressable>
                </View>
            ))}

            <Text className="text-center text-sm text-gray-400 mt-4">
                Esta aplicación fue desarrollada como parte del proyecto final para ITLA 1-2025.
            </Text>
        </ScrollView>
    );
}
