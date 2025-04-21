import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface NoticiaCardProps {
    titulo: string;
    contenido: string;
    imagen: string;
}

const NoticiaCard: React.FC<NoticiaCardProps> = ({ titulo, contenido, imagen }) => {
    return (
        <TouchableOpacity className="bg-white rounded-2xl shadow-md mb-4 mx-4 overflow-hidden">
            <Image
                source={{ uri: imagen }}
                className="w-full h-48"
                resizeMode="cover"
            />
            <View className="p-4">
                <Text className="text-lg font-bold text-gray-800">{titulo}</Text>
                <Text className="text-sm text-gray-600 mt-1">{contenido}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default NoticiaCard;
