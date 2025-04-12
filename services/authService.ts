import api from "../api/api";

export const iniciarSesion = async (cedula: string, clave: string) => {
    const formData = new URLSearchParams();
    formData.append("cedula", cedula);
    formData.append("clave", clave);

    const response = await api.post("iniciar_sesion.php", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return response.data;
};

export const recuperarContrasena = async (cedula: string, correo: string) => {
    const formData = new URLSearchParams();
    formData.append("cedula", cedula);
    formData.append("correo", correo);

    const response = await api.post("recuperar_clave.php", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return response.data;
};
