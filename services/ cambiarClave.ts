import api from '../api/api';

export const cambiarClave = async (datos: {
  token: string;
  clave_anterior: string;
  clave_nueva: string;
}) => {
  const formData = new URLSearchParams();

  for (const key in datos) {
    formData.append(key, datos[key as keyof typeof datos]);
  }

  const response = await api.post('cambiar_clave.php', formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};
