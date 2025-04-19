import api from '../api/api';

export const obtenerNoticias = async () => {
  try {
    const response = await api.get('noticias.php');
    const { exito, datos, mensaje } = response.data;

    if (!exito) {
      console.warn('Error al obtener noticias:', mensaje);
      return [];
    }

    if (!Array.isArray(datos)) {
      console.warn('El campo datos no es un array:', datos);
      return [];
    }

    return datos;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return [];
  }
};
