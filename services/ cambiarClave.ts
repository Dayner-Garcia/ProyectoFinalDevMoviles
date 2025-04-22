import {apiFetch} from "../api/api";

export const cambiarClave = async (datos: {
  token: string;
  clave_anterior: string;
  clave_nueva: string;
}) => {
  const formData = new URLSearchParams();
  for (const key in datos) {
    formData.append(key, datos[key as keyof typeof datos]);
  }
  const response = await apiFetch('cambiar_clave.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });
  return response;
};