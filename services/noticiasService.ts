import {Noticias} from "../types/Noticias/noticias";
import {apiFetch} from "../api/api";

export const obtenerNoticias = async (): Promise<{ exito: boolean; datos: Noticias[]; mensaje: string }> => {
    return apiFetch('noticias.php');
};

