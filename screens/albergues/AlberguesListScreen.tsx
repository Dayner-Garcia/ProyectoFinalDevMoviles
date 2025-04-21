import {ActivityIndicator, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {obtenerAlbergues} from "../../services/alberguesService";
import {Albergue} from "../../types/albergues/Albergue";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AlberguesStackParamList} from "../../types/navigation/PublicDrawerParamList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useEffect, useState} from "react";

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
                <ActivityIndicator size="large" color="#007AFF"/>
            </View>
        );
    }

    return (
        <ScrollView className="bg-white px-4 py-5">
            <View className="flex-row items-center border border-gray-300 rounded-lg mb-5 px-3 py-2 bg-gray-50">
                <Icon name="magnify" size={22} color="#6B7280"/>
                <TextInput
                    className="ml-2 flex-1 text-base text-gray-800"
                    placeholder="Buscar albergue..."
                    value={busqueda}
                    onChangeText={setBusqueda}
                />
            </View>

            <Pressable
                onPress={() => navigation.navigate("MapaAlbergues")}
                className="bg-blue-600 py-3 rounded-xl mb-6"
            >
                <Text className="text-white text-center text-lg font-semibold">
                    🗺 Ver Mapa de Albergues
                </Text>
            </Pressable>

            {filtrados.map((a, index) => (
                <Pressable
                    key={index}
                    className="bg-white mb-4 p-5 rounded-2xl shadow-md border border-gray-200"
                    onPress={() => navigation.navigate("DetalleAlbergue", {albergue: a})}
                >
                    <Text className="text-lg font-bold text-gray-800 mb-1">
                        <Icon name="home-city-outline" size={18}/> {a.nombre || a.edificio}
                    </Text>
                    <Text className="text-gray-600">
                        <Icon name="map-marker" size={16}/> {a.ciudad || a.provincia}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                        <Icon name="phone" size={16}/> {a.telefono}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}