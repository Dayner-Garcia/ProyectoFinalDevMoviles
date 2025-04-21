import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import LineaCard from '../../components/LineaCard';
import { obtenerNoticias } from '../../services/lineasASeguirService';

interface Linea {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  foto: string;
}

interface State {
  lineas: Linea[];
  loading: boolean;
}

class LineasASeguirScreen extends React.Component<object, State> {
  interval: NodeJS.Timeout | null = null;

  constructor(props: object) {
    super(props);
    this.state = {
      lineas: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.cargarLineas();
    this.interval = setInterval(this.cargarLineas, 30000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  cargarLineas = async () => {
    this.setState({ loading: true });
    try {
      const data = await obtenerNoticias();
      this.setState({ lineas: data, loading: false });
    } catch (error) {
      console.error('Error cargando noticias:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { lineas, loading } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f4f6', padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
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
              <Text style={{ textAlign: 'center', color: '#6b7280' }}>No hay líneas disponibles.</Text>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default LineasASeguirScreen;
