import api from "../api/api";
import {Noticias} from "../types/Noticias/noticias";

export const obtenerNoticias = async (): Promise<{ exito: boolean; datos: Noticias[]; mesaje: string }> => {
    const response = await api.get('noticias.php');
    return response.data;
};

