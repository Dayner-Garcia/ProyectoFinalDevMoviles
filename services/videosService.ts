import api from "../api/api";

export const obtenerVideos = async () => {
    const response = await api.get('videos.php');
    return response.data;
};
