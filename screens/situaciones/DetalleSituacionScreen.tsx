import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const DetalleSituacionScreen = ({ route }: any) => {
  const { situacion } = route.params;
  const imagenUri = `data:image/jpeg;base64,${situacion.foto}`;
  const [imageError, setImageError] = useState(false);

  return (
      <ScrollView className="flex-1 bg-white px-5 pt-6 pb-10">
        {situacion.foto && !imageError ? (
            <Image
                source={{ uri: imagenUri }}
                className="w-full h-64 rounded-xl mb-4"
                resizeMode="cover"
                onError={() => setImageError(true)}
            />
        ) : (
            <View className="w-full h-64 bg-gray-200 rounded-xl justify-center items-center mb-4">
              <Text className="text-gray-400">Sin imagen</Text>
            </View>
        )}

        <View className="space-y-3">
          <View>
            <Text className="text-gray-500 font-semibold">Código:</Text>
            <Text className="text-gray-800 text-base">{situacion.id}</Text>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold">Fecha:</Text>
            <Text className="text-gray-800 text-base">{situacion.fecha}</Text>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold">Título:</Text>
            <Text className="text-gray-800 text-base">{situacion.titulo}</Text>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold">Descripción:</Text>
            <Text className="text-gray-800 text-base">{situacion.descripcion}</Text>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold">Estado:</Text>
            <Text className="text-blue-700 font-medium text-base">{situacion.estado}</Text>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold">Comentario:</Text>
            <Text className="text-gray-800 text-base">
              {situacion.comentario || 'Sin comentarios'}
            </Text>
          </View>
        </View>
      </ScrollView>
  );
};

export default DetalleSituacionScreen;
