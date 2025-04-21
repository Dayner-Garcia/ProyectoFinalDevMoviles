import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { getMisSituaciones } from '../../services/situacionesService';
import MapaSituacionesStyle from '../../styles/MapaSituacionesStyle';

const MapaSituacionesScreen = () => {
  const [situaciones, setSituaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<any>(null);

  const obtenerUbicacion = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permiso de ubicación denegado');
      return;
    }

    const ubicacion = await Location.getCurrentPositionAsync({});
    setLocation(ubicacion.coords);
  };

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token del usuario.');
        return;
      }

      const response = await getMisSituaciones(token);
      if (response.exito) {
        setSituaciones(response.datos);
      } else {
        console.error('Error al cargar situaciones:', response.mensaje);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarDatos();
      obtenerUbicacion();
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      cargarDatos();
      obtenerUbicacion();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={MapaSituacionesStyle.loading}>
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={MapaSituacionesStyle.loading}>
        <Text>Esperando la ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={MapaSituacionesStyle.container}>
      <Text style={MapaSituacionesStyle.header}>Mapa de Situaciones</Text>
      <MapView
        style={MapaSituacionesStyle.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        followsUserLocation>
        {situaciones.map((situacion) => (
          <Marker
            key={situacion.id}
            coordinate={{
              latitude: situacion.latitud,
              longitude: situacion.longitud,
            }}
            title={situacion.titulo}
            description={situacion.descripcion}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapaSituacionesScreen;
