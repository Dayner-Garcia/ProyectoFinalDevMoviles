import api from "../api/api";
import { MedidaPreventiva } from "../types/medidas/MedidaPreventiva";

export const obtenerMedidasPreventivas = async (): Promise<{
    exito: boolean;
    datos: MedidaPreventiva[];
    mensaje: string;
}> => {
    const response = await api.get("medidas_preventivas.php");
    return response.data;
};
