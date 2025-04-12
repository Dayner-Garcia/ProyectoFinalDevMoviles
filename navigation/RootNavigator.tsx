import {useAuth} from "../context/AuthContext";
import AuthDrawerNavigator from "./auth/AuthDrawerNavigator";
import PublicDrawerNavigator from "./public/PublicDrawerNavigator";

export default function RootNavigator() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <AuthDrawerNavigator /> : <PublicDrawerNavigator />;
}
