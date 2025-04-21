import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { obtenerAlbergues } from "../../services/alberguesService";
import { Albergue } from "../../types/albergues/Albergue";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AlberguesStackParamList } from "../../types/navigation/PublicDrawerParamList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AlberguesMapScreen() {
    const [albergues, setAlbergues] = useState<Albergue[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NativeStackNavigationProp<AlberguesStackParamList>>();

    useEffect(() => {
        const fetch = async () => {
            const res = await obtenerAlbergues();
            if (res.exito) {
                setAlbergues(res.datos);
            }
            setLoading(false);
        };
        fetch();
    }, []);

    const initialRegion = {
        latitude: 18.4789,
        longitude: -69.8917,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white px-6">
                <Icon name="map-search-outline" size={50} color="#007AFF" />
                <Text className="text-lg mt-4 text-gray-600">Cargando mapa de albergues...</Text>
                <ActivityIndicator size="large" color="#007AFF" className="mt-4" />
            </View>
        );
    }

    return (
        <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
            {albergues.map((a, index) => {
                const lat = parseFloat(a.lng || "");
                const lng = parseFloat(a.lat || "");
                if (isNaN(lat) || isNaN(lng)) return null;

                return (
                    <Marker
                        key={index}
                        coordinate={{ latitude: lat, longitude: lng }}
                        title={a.nombre || a.edificio}
                        description={a.ciudad || a.provincia}
                        onPress={() =>
                            navigation.navigate("DetalleAlbergue", {
                                albergue: a,
                                from: "MapaAlbergues",
                            })
                        }
                    />
                );
            })}
        </MapView>
    );
}
