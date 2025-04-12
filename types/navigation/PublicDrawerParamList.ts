import {Albergue} from "../albergues/Albergue";

export type PublicDrawerParamList = {
    Inicio: undefined;
    Historia: undefined;
    Servicios: undefined;
    Noticias: undefined;
    Videos: undefined;
    Miembros: undefined;
    "Quiero ser Voluntariado": undefined;
    "Acerca de": undefined;
    "Iniciar Sesión": undefined;
    "Recuperar Contraseña": undefined;
};

export type MedidasStackParamList = {
    ListaMedidas: undefined;
    DetalleMedida: {
        titulo: string;
        descripcion: string;
        foto: string;
    };
};

export type AlberguesStackParamList = {
    ListaAlbergues: undefined;
    DetalleAlbergue: {
        albergue: Albergue;
        from?: "ListaAlbergues" | "MapaAlbergues";
    };
    MapaAlbergues: undefined;
};



