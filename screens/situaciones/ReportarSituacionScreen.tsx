import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { reportarSituacion } from '../../services/situacionesService';

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
    const { status } = await Location.requestForegroundPermissionsAsync();
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📍 Reportar Situación</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />

      <Button title="📷 Seleccionar Imagen" onPress={seleccionarImagen} />
      {imagenBase64 && (
        <Image source={{ uri: `data:image/jpeg;base64,${imagenBase64}` }} style={styles.imagen} />
      )}

      <Button title="📡 Obtener Ubicación" onPress={obtenerUbicacion} />
      {latitud && longitud && (
        <View style={styles.ubicacionBox}>
          <Text style={styles.ubicacionText}>Latitud: {latitud}</Text>
          <Text style={styles.ubicacionText}>Longitud: {longitud}</Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="🚨 Enviar Reporte" onPress={enviar} disabled={loading} />
      </View>

      {loading && <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e40af',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginVertical: 12,
    borderRadius: 10,
  },
  ubicacionBox: {
    backgroundColor: '#e0f2fe',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  ubicacionText: {
    fontSize: 14,
    color: '#1e3a8a',
  },
});

export default ReportarSituacionScreen;
