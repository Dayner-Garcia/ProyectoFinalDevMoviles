import {apiFetch} from "../api/api";
import {servicios} from "../types/servicios/servicios";

export const obtenerServicios = async (): Promise<{exito:boolean,datos:servicios[],mensaje:string}> =>  {
    return apiFetch('servicios.php');
};