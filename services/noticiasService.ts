
import api from "../api/api";
import { Notice } from "types/notice/notice";


export const obtenerNoticias = async (): Promise<{exito: boolean;datos:Notice[];mesaje:string}> => {
    const response = await api.get('noticias.php');
    return response.data;
};

