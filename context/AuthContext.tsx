import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

interface User {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    token: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (cedula: string, clave: string) => Promise<string>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;

    useEffect(() => {
        const loadUser = async () => {
            try {
                const stored = await AsyncStorage.getItem("user");
                if (stored) setUser(JSON.parse(stored));
            } catch (e) {
                console.error("Error cargando usuario:", e);
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    if (loading) return null;

    const login = async (cedula: string, clave: string): Promise<string> => {
        try {
            const formData = new URLSearchParams();
            formData.append("cedula", cedula);
            formData.append("clave", clave);

            const res = await api.post("iniciar_sesion.php", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            if (res.data.exito && res.data.datos) {
                setUser(res.data.datos);
                await AsyncStorage.setItem("user", JSON.stringify(res.data.datos));
                return "success";
            } else {
                return res.data.mensaje || "Credenciales incorrectas";
            }
        } catch (err) {
            return "Error de conexión";
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
