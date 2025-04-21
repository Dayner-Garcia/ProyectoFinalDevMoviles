import {FlatList, Image, SafeAreaView, Text, View} from "react-native";
import {obtenerServicios} from "services/serviciosService";
import {servicios} from "types/servicios/servicios";
import React, {useEffect, useState} from "react";

export default function ServiciosScreen() {
    const [Servicio, setServicios] = useState<servicios[]>([]);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const res = await obtenerServicios();
                setServicios(res.datos);
            } catch (e) {
                console.error("error", e);
            }
        };

        fetchServicios();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-100 pt-2">
            <FlatList
                data={Servicio}
                keyExtractor={({id}) => id.toString()}
                contentContainerStyle={{paddingBottom: 20}}
                renderItem={({item}) => (
                    <View className="w-[94%] self-center bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
                        <Image
                            source={{uri: item.foto}}
                            className="w-full h-[150px] rounded-t-2xl"
                            resizeMode="cover"
                        />
                        <View className="px-4 py-3">
                            <Text className="text-xl font-bold text-center text-gray-800">{item.nombre}</Text>
                            <Text className="text-justify text-base text-gray-700 mt-2">{item.descripcion}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
