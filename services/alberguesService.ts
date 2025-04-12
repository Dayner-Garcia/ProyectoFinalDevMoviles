import api from "../api/api";
import { Albergue } from "../types/albergues/Albergue";

export const obtenerAlbergues = async (): Promise<{
    exito: boolean;
    datos: Albergue[];
    mensaje: string;
}> => {
    const response = await api.get("albergues.php");
    return response.data;
};
