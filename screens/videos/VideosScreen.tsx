import {FlatList, SafeAreaView, Text, View} from "react-native";
import {videos} from "types/Videos/videos";
import {obtenerVideos} from "services/videosService";
import React, {useEffect, useState} from "react";
import WebView from "react-native-webview";

export default function VideosScreen() {
    const [video, setVideos] = useState<videos[]>([]);

    useEffect(() => {
        const fecthVideos = async () => {
            try {
                const res = await obtenerVideos();
                setVideos(res.datos);
            } catch (e) {
                console.error("error", e);
            }
        };
        fecthVideos();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <FlatList
                data={video}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingBottom: 24}}
                renderItem={({item}) => (
                    <View className="w-[94%] self-center bg-white rounded-2xl shadow-md mb-5 px-4 py-5">
                        <Text className="text-lg font-bold text-center text-gray-800 mb-2">{item.titulo}</Text>

                        <WebView
                            className="w-[95%] self-center my-3 rounded-xl"
                            style={{height: 160}}
                            source={{uri: `https://www.youtube.com/embed/${item.link}`}}
                            javaScriptEnabled
                        />

                        <Text className="text-justify text-gray-700 mb-3">{item.descripcion}</Text>
                        <Text className="text-right text-xs text-gray-400 italic">{item.fecha}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
