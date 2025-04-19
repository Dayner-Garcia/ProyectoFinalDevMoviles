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
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
      <Image
        source={{ uri: foto }}
        style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 8 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1e40af' }}>{titulo}</Text>
      <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{fecha}</Text>
      <Text style={{ fontSize: 14, color: '#374151', marginTop: 8 }}>{contenido}</Text>
    </View>
  );
};

export default LineaCard;
