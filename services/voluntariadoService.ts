import {apiFetch} from "../api/api";
import {VoluntarioRequest} from "../types/voluntariado/VoluntarioRequest";

export const enviarSolicitudVoluntario = async (datos: VoluntarioRequest) => {
    const formData = new URLSearchParams();
    Object.entries(datos).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return apiFetch("registro.php", {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    });
};