import api from "../api/api";

export const obtenerVideos = async (): Promise<{exito:boolean;datos:[],mensaje:string}> => {
    const response = await api.get('videos.php');
    return response.data;
};
