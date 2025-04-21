import api from "../api/api";
import {Miembros} from "../types/miembros/Miembros";

export const obtenerMiembros = async (): Promise<{ exito: boolean; datos: Miembros[]; mensaje: string }> => {
    const response = await api.get("miembros.php");
    return response.data;
};
