import api from "../api/api";

export const obtenerMedidas = async () => {
    const response = await api.get('medidas.php');
    return response.data;
};
