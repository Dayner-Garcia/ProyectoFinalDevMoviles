import {apiFetch} from "../api/api";
import {Albergue} from "../types/albergues/Albergue";

export const obtenerAlbergues = async (): Promise<{
    exito: boolean;
    datos: Albergue[];
    mensaje: string;
}> => {
    return apiFetch('albergues.php');
};