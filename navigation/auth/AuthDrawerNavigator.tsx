import {createDrawerNavigator} from "@react-navigation/drawer";
import LogoutScreen from "../../screens/auth/LogoutScreen";
import CambiarContrasenaScreen from "../../screens/perfil/CambiarContrasenaScreen";
import MisSituacionesScreen from "../../screens/situaciones/MisSituacionesScreen";
import ReportarSituacionScreen from "../../screens/situaciones/ReportarSituacionScreen";
import LineasASeguirScreen from "../../screens/noticias/LineasASeguirScreen";
import MapaSituacionesScreen from "../../screens/situaciones/MapaSituacionesScreen";

const Drawer = createDrawerNavigator();

export default function AuthDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Noticias Internas">
            <Drawer.Screen name="Noticias Internas" component={LineasASeguirScreen} />
            <Drawer.Screen name="Reportar Situación" component={ReportarSituacionScreen} />
            <Drawer.Screen name="Mis Situaciones" component={MisSituacionesScreen} />
            <Drawer.Screen name="Mapa de Situaciones" component={MapaSituacionesScreen} />
            <Drawer.Screen name="Cambiar Contraseña" component={CambiarContrasenaScreen} />
            <Drawer.Screen name="Cerrar Sesión" component={LogoutScreen} />
        </Drawer.Navigator>
    );
}