import {MedidaPreventiva} from "../types/medidas/MedidaPreventiva";
import {apiFetch} from "../api/api";

export const obtenerMedidasPreventivas = async (): Promise<{
    exito: boolean;
    datos: MedidaPreventiva[];
    mensaje: string;
}> => {
    return apiFetch("medidas_preventivas.php");
};