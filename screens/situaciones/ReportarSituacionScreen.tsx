import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Button, Image, ScrollView, Text, TextInput, View,} from 'react-native';

import {reportarSituacion} from '../../services/situacionesService';

const ReportarSituacionScreen = () => {
    const [token, setToken] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenBase64, setImagenBase64] = useState<string | null>(null);
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        obtenerToken();
    }, []);

    const obtenerToken = async () => {
        const t = await AsyncStorage.getItem('token');
        if (t) setToken(t);
    };

    const obtenerUbicacion = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación.');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLatitud(location.coords.latitude.toString());
        setLongitud(location.coords.longitude.toString());
    };

    const seleccionarImagen = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            quality: 0.6,
        });

        if (!result.canceled) {
            setImagenBase64(result.assets[0].base64 ?? null);
        }
    };

    const enviar = async () => {
        if (!titulo || !descripcion || !imagenBase64 || !latitud || !longitud) {
            Alert.alert('Campos requeridos', 'Completa todos los campos.');
            return;
        }

        setLoading(true);

        try {
            const datos = {
                titulo,
                descripcion,
                foto: imagenBase64,
                latitud,
                longitud,
                token,
            };

            const respuesta = await reportarSituacion(datos);

            if (respuesta.exito) {
                Alert.alert('Éxito', respuesta.mensaje);
                setTitulo('');
                setDescripcion('');
                setImagenBase64(null);
                setLatitud('');
                setLongitud('');
            } else {
                Alert.alert('Error', respuesta.mensaje);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al enviar la situación.');
        }

        setLoading(false);
    };

    return (
        <ScrollView contentContainerStyle={{paddingBottom: 32}} className="bg-gray-100 px-5 pt-8">
            <Text className="text-2xl font-bold text-center text-blue-800 mb-6">📍 Reportar Situación</Text>

            <TextInput
                placeholder="Título"
                value={titulo}
                onChangeText={setTitulo}
                className="bg-white border border-gray-300 px-4 py-3 rounded-lg mb-4"
            />

            <TextInput
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={4}
                className="bg-white border border-gray-300 px-4 py-3 rounded-lg mb-4 h-24 text-justify"
            />

            <Button title="📷 Seleccionar Imagen" onPress={seleccionarImagen}/>
            {imagenBase64 && (
                <Image
                    source={{uri: `data:image/jpeg;base64,${imagenBase64}`}}
                    className="w-full h-52 rounded-lg mt-4 mb-3"
                />
            )}

            <Button title="📡 Obtener Ubicación" onPress={obtenerUbicacion}/>
            {latitud && longitud && (
                <View className="bg-blue-100 p-3 rounded-lg mt-4">
                    <Text className="text-blue-800">Latitud: {latitud}</Text>
                    <Text className="text-blue-800">Longitud: {longitud}</Text>
                </View>
            )}

            <View className="mt-6">
                <Button title="🚨 Enviar Reporte" onPress={enviar} disabled={loading}/>
            </View>

            {loading && <ActivityIndicator size="large" color="#2563EB" className="mt-5"/>}
        </ScrollView>
    );
};

export default ReportarSituacionScreen;