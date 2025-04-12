import api from "../api/api";

export const obtenerMiembros = async () => {
    const response = await api.get('miembros.php');
    return response.data;
};