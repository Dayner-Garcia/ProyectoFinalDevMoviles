import api from "../api/api";

export const reportarSituacion = async (datos: {
    titulo: string;
    descripcion: string;
    foto: string; // base64
    latitud: string;
    longitud: string;
}) => {
    const response = await api.post('reportar_situacion.php', datos);
    return response.data;
};

export const obtenerMisSituaciones = async (usuarioId: string) => {
    const response = await api.get(`mis_situaciones.php?usuario=${usuarioId}`);
    return response.data;
};