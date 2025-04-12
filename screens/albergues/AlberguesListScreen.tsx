import { useEffect, useState } from "react";
import { ScrollView, TextInput, View, Text, Pressable, ActivityIndicator } from "react-native";
import { obtenerAlbergues } from "../../services/alberguesService";
import { Albergue } from "../../types/albergues/Albergue";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {AlberguesStackParamList} from "../../types/navigation/PublicDrawerParamList";


export default function AlberguesListScreen() {
    const [albergues, setAlbergues] = useState<Albergue[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NativeStackNavigationProp<AlberguesStackParamList>>();

    useEffect(() => {
        const fetch = async () => {
            const res = await obtenerAlbergues();
            if (res.exito) setAlbergues(res.datos);
            setLoading(false);
        };
        fetch();
    }, []);

    const filtrados = albergues.filter((a) =>
        (a.nombre || a.edificio || "").toLowerCase().includes(busqueda.toLowerCase())
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView className="bg-white p-4">
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-4"
                placeholder="Buscar albergue..."
                value={busqueda}
                onChangeText={setBusqueda}
            />
            <Pressable
                onPress={() => navigation.navigate("MapaAlbergues")}
                className="bg-blue-500 py-3 px-4 rounded-lg mb-4"
            >
                <Text className="text-white text-center font-bold">Ver Mapa de Albergues</Text>
            </Pressable>

            {filtrados.map((a, index) => (
                <Pressable
                    key={index}
                    className="bg-gray-100 mb-3 p-4 rounded-lg shadow"
                    onPress={() => navigation.navigate("DetalleAlbergue", { albergue: a })}
                >
                    <Text className="text-lg font-bold">{a.nombre || a.edificio}</Text>
                    <Text className="text-gray-600">{a.ciudad || a.provincia}</Text>
                    <Text className="text-gray-500 text-sm">{a.telefono}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}
