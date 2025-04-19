import api from '../api/api';

export const reportarSituacion = async (datos: {
  titulo: string;
  descripcion: string;
  foto: string;
  latitud: string;
  longitud: string;
  token: string;
}) => {
  const formData = new URLSearchParams();

  for (const key in datos) {
    formData.append(key, datos[key as keyof typeof datos]);
  }

  const response = await api.post('nueva_situacion.php', formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};

export const getMisSituaciones = async (token: string) => {
  const body = new URLSearchParams();
  body.append('token', token);

  const response = await api.post('situaciones.php', body.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};
