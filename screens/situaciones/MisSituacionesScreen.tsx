import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View,} from 'react-native';
import {getMisSituaciones} from '../../services/situacionesService';

const MisSituacionesScreen = ({navigation}: any) => {
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

    const renderItem = ({item}: any) => (
        <TouchableOpacity
            className="bg-white rounded-2xl shadow-md mb-4 mx-4 overflow-hidden"
            onPress={() => navigation.navigate('DetalleSituacionScreen', {situacion: item})}
        >
            <Image
                source={{uri: `data:image/jpeg;base64,${item.foto}`}}
                className="w-full h-48"
                resizeMode="cover"
                onError={() => console.log('❌ Error cargando imagen')}
            />
            <View className="p-4 space-y-1">
                <Text className="text-lg font-bold text-gray-800">{item.titulo}</Text>
                <Text className="text-sm text-gray-500 italic">{item.fecha}</Text>
                <Text className="text-sm text-blue-700 font-medium">Estado: {item.estado}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563EB"/>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100 pt-4">
            <FlatList
                data={situaciones}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingBottom: 20}}
            />
        </View>
    );
};

export default MisSituacionesScreen;
