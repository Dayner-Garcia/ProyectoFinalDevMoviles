import api from "../api/api";

export const obtenerServicios = async () => {
    const response = await api.get('servicios.php');
    return response.data;
};
