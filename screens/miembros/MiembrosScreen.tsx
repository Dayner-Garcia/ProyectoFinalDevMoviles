import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import {Miembros} from "../../types/miembros/Miembros";
import {obtenerMiembros} from "../../services/miembrosService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";

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
            <View className="flex-1 justify-center items-center bg-white px-6">
                <Icon name="account-group-outline" size={50} color="#007AFF" />
                <Text className="text-lg mt-4 text-gray-600">Cargando miembros...</Text>
                <ActivityIndicator size="large" color="#4b5563" className="mt-4" />
            </View>
        );
    }

    return (
        <ScrollView className="bg-white px-4 py-6">
            <Text className="text-2xl font-bold text-blue-900 text-center mb-6">
                <Icon name="account-group-outline" size={22} color="#1e3a8a" /> Miembros de la Defensa Civil
            </Text>

            {miembros.map((miembro) => (
                <View
                    key={miembro.id}
                    className="bg-white border border-gray-200 p-4 rounded-2xl mb-5 shadow-md flex-row items-center"
                >
                    <Image
                        source={{ uri: miembro.foto }}
                        style={{ width: 80, height: 80, borderRadius: 40, marginRight: 16 }}
                        contentFit="cover"
                        transition={300}
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-semibold text-gray-800">
                            <Icon name="account" size={18} /> {miembro.nombre}
                        </Text>
                        <Text className="text-gray-500 mt-1">
                            <Icon name="briefcase-outline" size={16} /> {miembro.cargo}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}