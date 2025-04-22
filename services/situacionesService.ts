import {apiFetch} from "../api/api";

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
  return apiFetch('nueva_situacion.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
  });
};

export const getMisSituaciones = async (token: string) => {
  const formData = new URLSearchParams();
  formData.append('token', token);
  return apiFetch('situaciones.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
  });
};