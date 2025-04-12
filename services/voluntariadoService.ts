import api from "../api/api";
import { VoluntarioRequest } from "../types/voluntariado/VoluntarioRequest";

export const enviarSolicitudVoluntario = async (datos: VoluntarioRequest) => {
    const formData = new URLSearchParams();
    Object.entries(datos).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await api.post("registro.php", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    return response.data;
};
