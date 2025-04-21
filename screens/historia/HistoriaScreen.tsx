import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import WebView from "react-native-webview";
import React, {useState} from "react";
import {media} from "types/historia/historiaInfo";

export default function HistoriaScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{paddingBottom: 40}}>
                <View className="flex-row items-center justify-center my-5 space-x-3">
                    <TouchableOpacity onPress={goPrevious} className="p-3 rounded-full bg-orange-100">
                        <Text className="text-2xl text-orange-600">{'<'}</Text>
                    </TouchableOpacity>

                    <View className="w-4/5 h-[200px] overflow-hidden rounded-2xl border border-orange-300">
                        {media[currentIndex].type === 'video' ? (
                            <WebView
                                javaScriptEnabled
                                className="w-full h-full rounded-2xl"
                                source={{uri: media[currentIndex].uri}}
                            />
                        ) : (
                            <Image
                                source={media[currentIndex].uri}
                                className="w-full h-full rounded-2xl"
                                resizeMode="contain"
                            />
                        )}
                    </View>

                    <TouchableOpacity onPress={goNext} className="p-3 rounded-full bg-orange-100">
                        <Text className="text-2xl text-orange-600">{'>'}</Text>
                    </TouchableOpacity>
                </View>

                <Text className="px-5 text-base leading-6 text-justify text-gray-800">
                    Antes del año 1966, cuando llegaba la temporada de huracanes, un grupo de
                    radioaficionados se reunía en la Cruz Roja para estar atentos por si surgía
                    algún tipo de emergencia, e inmediatamente ponerse a disposición y ayudar en
                    todo lo posible, incluso usando sus propios equipos de comunicación para
                    tener contacto con el exterior en caso de que las redes telefónicas resultaran
                    afectadas.{"\n\n"}

                    Al surgir el triunvirato, fue designado el Dr. Rafael Cantizano Arias como
                    presidente de la Cruz Roja, y al mismo tiempo nombraron al Ing. Carlos D´Franco
                    como director de la Defensa Civil, quien con un grupo compuesto por seis personas,
                    se instaló en la calle Francia esquina Galván, siendo esa la primera oficina
                    de la Defensa Civil.{"\n\n"}

                    Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García Godoy,
                    a los diecisiete días del mes de junio de 1966, fue promulgada la Ley 257,
                    mediante la cual fue creada la Defensa Civil, institución dependiente de la
                    Secretaría Administrativa de la Presidencia (ahora Ministerio de la Presidencia),
                    y quien en la actualidad preside la Comisión Nacional de Emergencias.{"\n\n"}

                    Más adelante, el local fue trasladado a la calle Dr. Delgado No. 164 y luego,
                    en la gestión del Contralmirante Radhamés Lora Salcedo, se reubicó a la
                    Plaza de la Salud, donde aún permanece.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
