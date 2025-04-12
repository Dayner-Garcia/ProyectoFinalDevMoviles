import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LogoutScreen() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    return null;
}
