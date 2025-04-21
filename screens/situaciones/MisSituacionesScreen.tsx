import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getMisSituaciones } from '../../services/situacionesService';
import MisSituacionesStyle from '../../styles/MisSituacionesStyle';

const MisSituacionesScreen = ({ navigation }: any) => {
  const [situaciones, setSituaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró el token del usuario.');
        return;
      }

      const response = await getMisSituaciones(token);

      if (response.exito) {
        setSituaciones(response.datos);
      } else {
        Alert.alert('Error', response.mensaje || 'No se pudieron cargar las situaciones.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener las situaciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();

    const focusListener = navigation.addListener('focus', () => {
      cargarDatos();
    });

    return () => {
      focusListener();
    };
  }, [navigation]);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={MisSituacionesStyle.card}
        onPress={() => navigation.navigate('DetalleSituacionScreen', { situacion: item })}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
          style={MisSituacionesStyle.image}
          resizeMode="cover"
          onError={() => console.log('❌ Error cargando imagen')}
        />
        <View style={MisSituacionesStyle.textContainer}>
          <Text style={MisSituacionesStyle.titulo}>{item.titulo}</Text>
          <Text style={MisSituacionesStyle.fecha}>{item.fecha}</Text>
          <Text style={MisSituacionesStyle.estado}>Estado: {item.estado}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={MisSituacionesStyle.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={MisSituacionesStyle.container}>
      <FlatList
        data={situaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MisSituacionesScreen;
