import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getMisSituaciones } from '../../services/situacionesService';

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
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-base text-gray-600">Cargando mapa...</Text>
            </View>
        );
    }

    if (!location) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-base text-gray-600">Esperando la ubicación...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                showsUserLocation
                followsUserLocation
            >
                {situaciones.map((situacion) => (
                    <Marker
                        key={situacion.id}
                        coordinate={{
                            latitude: situacion.latitud,
                            longitude: situacion.longitud,
                        }}
                        title={situacion.titulo}
                        description={situacion.descripcion}
                        tracksViewChanges={false}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapaSituacionesScreen;
