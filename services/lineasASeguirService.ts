import {apiFetch} from "../api/api";
import {Linea} from "../types/Noticias/Linea";

export const obtenerLineasASeguir = async (): Promise<Linea[]> => {
  try {
    const { exito, datos, mensaje } = await apiFetch('noticias.php');

    if (!exito || !Array.isArray(datos)) {
      console.warn('Error al obtener líneas a seguir:', mensaje || datos);
      return [];
    }

    return datos;
  } catch (error) {
    console.error('Error al cargar líneas a seguir:', error);
    return [];
  }
};
