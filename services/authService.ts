import {apiFetch} from "../api/api";

export const iniciarSesion = async (cedula: string, clave: string) => {
    const formData = new URLSearchParams();
    formData.append("cedula", cedula);
    formData.append("clave", clave);
    return apiFetch("iniciar_sesion.php", {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString()
    });
};

export const recuperarContrasena = async (cedula: string, correo: string) => {
    const formData = new URLSearchParams();
    formData.append("cedula", cedula);
    formData.append("correo", correo);
    return apiFetch("recuperar_clave.php", {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString()
    });
};