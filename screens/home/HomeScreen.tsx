import {Animated, Dimensions, FlatList, Image, SafeAreaView, Text, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import { HomeInfon } from "../../types/HomeScreen/HomeInfon";

const width = Dimensions.get("window").width;
const ANCHO_CONTENEDOR = width * 0.88;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;

export default function HomeScreen() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % HomeInfon.length;
            flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
            setCurrentIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="bg-orange-600 py-6 px-4 shadow-md shadow-orange-500 rounded-b-3xl">
                <Text className="text-white text-2xl font-extrabold text-center uppercase tracking-wide">
                    Defensa Civil RD
                </Text>
                <Text className="text-white text-sm text-center mt-1 italic">Protegiendo y sirviendo</Text>
            </View>

            <Animated.FlatList
                ref={flatListRef}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                snapToAlignment="start"
                contentContainerStyle={{
                    paddingTop: 60,
                    paddingHorizontal: ESPACIO_CONTENEDOR,
                }}
                snapToInterval={ANCHO_CONTENEDOR}
                decelerationRate={0}
                scrollEventThrottle={16}
                data={HomeInfon}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,
                        index * ANCHO_CONTENEDOR,
                        (index + 1) * ANCHO_CONTENEDOR,
                    ];

                    const scrollY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -50, 0],
                    });

                    return (
                        <View style={{width: ANCHO_CONTENEDOR}}>
                            <Animated.View
                                className="mx-2 rounded-3xl bg-white items-center shadow-lg shadow-gray-500"
                                style={{transform: [{translateY: scrollY}]}}
                            >
                                <Image
                                    source={item.image}
                                    className="w-full mb-3 rounded-3xl"
                                    style={{height: ANCHO_CONTENEDOR * 1.3, resizeMode: "cover"}}
                                />
                            </Animated.View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
}
