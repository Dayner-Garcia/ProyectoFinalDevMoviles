import React from 'react';
import { Text, View, Image } from 'react-native';

interface LineaCardProps {
    titulo: string;
    contenido: string;
    fecha: string;
    foto: string;
}

const LineaCard: React.FC<LineaCardProps> = ({ titulo, contenido, fecha, foto }) => {
    return (
        <View className="bg-white rounded-xl p-4 mb-3 shadow-md mx-4">
            <Image
                source={{ uri: foto }}
                className="w-full h-48 rounded-lg mb-3"
                resizeMode="cover"
            />
            <Text className="text-lg font-bold text-blue-800">{titulo}</Text>
            <Text className="text-xs text-gray-500 mt-1">{fecha}</Text>
            <Text className="text-sm text-gray-700 mt-2">{contenido}</Text>
        </View>
    );
};

export default LineaCard;
