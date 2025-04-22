import {apiFetch} from "../api/api";
import {Miembros} from "../types/miembros/Miembros";

export const obtenerMiembros = async (): Promise<{ exito: boolean; datos: Miembros[]; mensaje: string }> => {
    return apiFetch("miembros.php");
};