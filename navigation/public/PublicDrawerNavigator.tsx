import {createDrawerNavigator} from "@react-navigation/drawer";
import LoginScreen from "../../screens/auth/LoginScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import HistoriaScreen from "../../screens/historia/HistoriaScreen";
import ServiciosScreen from "../../screens/servicios/ServiciosScreen";
import VideosScreen from "../../screens/videos/VideosScreen";
import AlberguesMapScreen from "../../screens/albergues/AlberguesMapScreen";
import MiembrosScreen from "../../screens/miembros/MiembrosScreen";
import NoticiasListScreen from "../../screens/noticias/NoticiasListScreen";
import AlberguesListScreen from "../../screens/albergues/AlberguesListScreen";
import MedidasListScreen from "../../screens/medidas/MedidasListScreen";
import QuieroSerVoluntarioScreen from "../../screens/voluntariado/QuieroSerVoluntarioScreen";
import AcercaDeScreen from "../../screens/about/AcercaDeScreen";
import RecoverPasswordScreen from "../../screens/auth/RecoverPasswordScreen";

const Drawer = createDrawerNavigator();

export default function PublicDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Inicio">
            <Drawer.Screen name="Inicio" component={HomeScreen}/>
            <Drawer.Screen name="Historia" component={HistoriaScreen}/>
            <Drawer.Screen name="Servicios" component={ServiciosScreen}/>
            <Drawer.Screen name="Noticias" component={NoticiasListScreen}/>
            <Drawer.Screen name="Videos" component={VideosScreen}/>
            <Drawer.Screen name="Albergues" component={AlberguesListScreen}/>
            <Drawer.Screen name="Mapa de Albergues" component={AlberguesMapScreen}/>
            <Drawer.Screen name="Medidas Preventivas" component={MedidasListScreen}/>
            <Drawer.Screen name="Miembros" component={MiembrosScreen}/>
            <Drawer.Screen name="Quiero ser Voluntariado" component={QuieroSerVoluntarioScreen}/>
            <Drawer.Screen name="Acerca de" component={AcercaDeScreen}/>
            <Drawer.Screen name="Iniciar Sesión" component={LoginScreen}/>
            <Drawer.Screen name="Recuperar Contraseña" component={RecoverPasswordScreen}/>
        </Drawer.Navigator>
    );
}
