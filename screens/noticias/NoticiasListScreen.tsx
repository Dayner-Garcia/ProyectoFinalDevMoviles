import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import { Noticias } from "../../types/Noticias/noticias";
import { obtenerNoticias } from "../../services/noticiasService";

export default function NoticiasListScreen() {
    const [noticias, setNoticias] = useState<Noticias[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const res = await obtenerNoticias();
                setNoticias(res.datos);
            } catch (e) {
                console.error("error", e);
            }
        };
        fetchNoticias();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <FlatList
                data={noticias}
                keyExtractor={({id}) => id.toString()}
                contentContainerStyle={{paddingBottom: 24}}
                renderItem={({item}) => (
                    <View className="w-[94%] self-center bg-white rounded-2xl shadow-md mb-4">
                        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                            <View className="bg-[#0D1F2D] rounded-t-2xl border-b-4 border-[#F57C00] px-4 py-5">
                                <Text className="text-white text-lg font-bold text-center tracking-wider">
                                    {item.titulo}
                                </Text>
                            </View>

                            <Image
                                source={{uri: item.foto}}
                                className="w-[250px] h-[150px] self-center my-3 rounded-xl"
                                resizeMode="cover"
                            />

                            <Text className="text-right text-sm text-orange-500 pr-4">Mostrar más</Text>

                            {expandedId === item.id && (
                                <View className="px-5 py-3">
                                    <Text className="text-gray-700 text-base text-justify mb-2">{item.contenido}</Text>
                                    <Text className="text-sm text-gray-500 text-right italic">
                                        Publicado el {item.fecha_publicacion}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
