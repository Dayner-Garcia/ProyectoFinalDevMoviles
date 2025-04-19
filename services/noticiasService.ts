import api from '../api/api';

export const obtenerNoticias = async () => {
  const response = await api.get('noticias.php');
  return response.data;
};
