import api from "../api/api";
import { servicios } from "types/servicios/servicios";

export const obtenerServicios = async (): Promise<{exito:boolean,datos:servicios[],mensaje:string}> =>  {
    const response = await api.get('servicios.php');
    return response.data;
};
