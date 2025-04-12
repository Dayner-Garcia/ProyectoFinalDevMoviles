import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import {Miembros} from "../../types/miembros/Miembros";
import {obtenerMiembros} from "../../services/miembrosService";


export default function MiembrosScreen() {
    const [miembros, setMiembros] = useState<Miembros[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMiembros = async () => {
            try {
                const res = await obtenerMiembros();
                if (res.exito) {
                    setMiembros(res.datos);
                }
            } catch (e) {
                console.error("Error cargando miembros:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchMiembros();
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
            <Text className="text-2xl font-bold text-center mb-4">Miembros de la Defensa Civil</Text>

            {miembros.map((miembro) => (
                <View
                    key={miembro.id}
                    className="bg-gray-100 p-4 rounded-2xl mb-4 shadow-sm flex-row items-center"
                >
                    <Image
                        source={{ uri: miembro.foto }}
                        style={{ width: 80, height: 80, borderRadius: 40, marginRight: 16 }}
                        resizeMode="cover"
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-semibold">
                            {miembro.nombre}
                        </Text>
                        <Text className="text-gray-600">{miembro.cargo}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
