import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import {AlberguesStackParamList} from "../../types/navigation/PublicDrawerParamList";


export default function AlbergueDetailScreen() {
    const { params } = useRoute<RouteProp<AlberguesStackParamList, "DetalleAlbergue">>();
    const albergue = params.albergue;

    return (
        <ScrollView className="bg-white p-5">
            <Text className="text-2xl font-bold mb-2">{albergue.nombre || albergue.edificio}</Text>
            <Text className="text-base text-gray-700 mb-1">📍 {albergue.ciudad || albergue.provincia}</Text>
            {albergue.direccion && (
                <Text className="text-base text-gray-700 mb-1">📫 Dirección: {albergue.direccion}</Text>
            )}
            <Text className="text-base text-gray-700 mb-1">📞 Teléfono: {albergue.telefono}</Text>
            <Text className="text-base text-gray-700 mb-1">👤 Coordinador: {albergue.coordinador || "N/D"}</Text>
            <Text className="text-base text-gray-700 mb-1">👥 Capacidad: {albergue.capacidad || "N/D"}</Text>
            <Text className="text-sm text-gray-500 mt-4">Código: {albergue.codigo || "N/D"}</Text>
        </ScrollView>
    );
}
