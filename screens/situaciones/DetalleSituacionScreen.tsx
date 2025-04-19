import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import DetalleSituacionesStyle from '../../styles/DetalleSituacionesStyle';

const DetalleSituacionScreen = ({ route }: any) => {
  const { situacion } = route.params;

  const imagenUri = `data:image/jpeg;base64,${situacion.foto}`;

  const [imageError, setImageError] = useState(false);

  return (
    <ScrollView style={DetalleSituacionesStyle.container}>
      {situacion.foto && !imageError ? (
        <Image
          source={{ uri: imagenUri }}
          style={DetalleSituacionesStyle.imagen}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[DetalleSituacionesStyle.imagen, DetalleSituacionesStyle.placeholder]}>
          <Text style={{ color: '#9ca3af' }}>Sin imagen</Text>
        </View>
      )}

      <View style={DetalleSituacionesStyle.info}>
        <Text style={DetalleSituacionesStyle.label}>Código:</Text>
        <Text style={DetalleSituacionesStyle.valor}>{situacion.id}</Text>

        <Text style={DetalleSituacionesStyle.label}>Fecha:</Text>
        <Text style={DetalleSituacionesStyle.valor}>{situacion.fecha}</Text>

        <Text style={DetalleSituacionesStyle.label}>Título:</Text>
        <Text style={DetalleSituacionesStyle.valor}>{situacion.titulo}</Text>

        <Text style={DetalleSituacionesStyle.label}>Descripción:</Text>
        <Text style={DetalleSituacionesStyle.valor}>{situacion.descripcion}</Text>

        <Text style={DetalleSituacionesStyle.label}>Estado:</Text>
        <Text style={DetalleSituacionesStyle.valor}>{situacion.estado}</Text>

        <Text style={DetalleSituacionesStyle.label}>Comentario:</Text>
        <Text style={DetalleSituacionesStyle.valor}>
          {situacion.comentario || 'Sin comentarios'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetalleSituacionScreen;
