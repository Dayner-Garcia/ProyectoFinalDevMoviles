export interface LoginResponse {
    exito: string;
    mensaje: string;
    datos?: {
        nombre: string;
        cedula: string;
        correo: string;
        token: string;
    };
}