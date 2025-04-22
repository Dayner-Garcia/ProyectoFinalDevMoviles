import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import LineaCard from '../../components/LineaCard';
import { obtenerLineasASeguir } from "../../services/lineasASeguirService";
import {useEffect, useState} from "react";

interface Linea {
    id: string;
    titulo: string;
    contenido: string;
    fecha: string;
    foto: string;
}

const LineasASeguirScreen: React.FC = () => {
    const [lineas, setLineas] = useState<Linea[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarLineas = async () => {
        setLoading(true);
        try {
            const data = await obtenerLineasASeguir();
            setLineas(data);
        } catch (error) {
            console.error('Error cargando noticias:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarLineas();
        const interval = setInterval(cargarLineas, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 bg-gray-100 px-4 pt-6">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
                Líneas a Seguir
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#2563EB" />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {lineas.length > 0 ? (
                        lineas.map((linea) => (
                            <LineaCard
                                key={linea.id}
                                titulo={linea.titulo}
                                contenido={linea.contenido}
                                fecha={linea.fecha}
                                foto={linea.foto}
                            />
                        ))
                    ) : (
                        <Text className="text-center text-gray-500">
                            No hay líneas disponibles.
                        </Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default LineasASeguirScreen;
