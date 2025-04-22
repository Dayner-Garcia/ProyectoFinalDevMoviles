import {apiFetch} from "../api/api";

export const obtenerVideos = async (): Promise<{exito:boolean;datos:[],mensaje:string}> => {
    return apiFetch('videos.php');
};
