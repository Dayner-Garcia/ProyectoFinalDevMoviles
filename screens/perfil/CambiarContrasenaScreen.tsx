import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity,} from 'react-native';
import {cambiarClave} from "../../services/ cambiarClave";

export default function CambiarContrasenaScreen() {
    const [claveAnterior, setClaveAnterior] = useState('');
    const [claveNueva, setClaveNueva] = useState('');
    const [confirmacionClaveNueva, setConfirmacionClaveNueva] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCambiarClave = async () => {
        if (!claveAnterior || !claveNueva || !confirmacionClaveNueva) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (claveNueva !== confirmacionClaveNueva) {
            Alert.alert('Error', 'Las nuevas contraseñas no coinciden.');
            return;
        }

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No se encontró el token del usuario.');
                return;
            }

            const respuesta = await cambiarClave({
                token,
                clave_anterior: claveAnterior,
                clave_nueva: claveNueva,
            });

            if (respuesta.exito) {
                Alert.alert('Éxito', 'Contraseña cambiada correctamente.');
                setClaveAnterior('');
                setClaveNueva('');
                setConfirmacionClaveNueva('');
            } else {
                Alert.alert('Error', respuesta.mensaje || 'No se pudo cambiar la contraseña.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 justify-center bg-white px-6"
        >
            <Text className="text-2xl font-bold text-center text-blue-800 mb-6">
                Cambiar Contraseña
            </Text>

            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white"
                placeholder="Contraseña Actual"
                secureTextEntry
                value={claveAnterior}
                onChangeText={setClaveAnterior}
            />
            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white"
                placeholder="Nueva Contraseña"
                secureTextEntry
                value={claveNueva}
                onChangeText={setClaveNueva}
            />
            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 mb-6 bg-white"
                placeholder="Confirmar Nueva Contraseña"
                secureTextEntry
                value={confirmacionClaveNueva}
                onChangeText={setConfirmacionClaveNueva}
            />

            <TouchableOpacity
                className="bg-blue-700 rounded-lg py-3 items-center"
                onPress={handleCambiarClave}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff"/>
                ) : (
                    <Text className="text-white font-semibold text-base">Cambiar</Text>
                )}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
