import api from "../api/api";


export const obtenerAlbergues = async () => {
    const response = await api.get('albergues.php');
    return response.data;
};