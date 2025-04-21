import { createDrawerNavigator } from '@react-navigation/drawer';
import LogoutScreen from '../../screens/auth/LogoutScreen';
import LineasASeguirScreen from '../../screens/noticias/LineasASeguirScreen';
import CambiarContrasenaScreen from '../../screens/perfil/CambiarContrasenaScreen';
import MapaSituacionesScreen from '../../screens/situaciones/MapaSituacionesScreen';
import ReportarSituacionScreen from '../../screens/situaciones/ReportarSituacionScreen';
import SituacionesStack from '../stacks/SituacionesStack';
import CustomDrawerContent from "../common/CustomDrawerContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Drawer = createDrawerNavigator();

export default function AuthDrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Noticias Internas"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: '#2563EB',
                drawerInactiveTintColor: '#6B7280',
                drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
            }}
        >
            <Drawer.Screen name="Noticias Internas" component={LineasASeguirScreen} options={{
                drawerIcon: ({ color }) => <Icon name="text-box-check-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Reportar Situación" component={ReportarSituacionScreen} options={{
                drawerIcon: ({ color }) => <Icon name="alert-plus-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Mis Situaciones" component={SituacionesStack} options={{
                drawerIcon: ({ color }) => <Icon name="history" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Mapa de Situaciones" component={MapaSituacionesScreen} options={{
                drawerIcon: ({ color }) => <Icon name="map-marker-radius-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Cambiar Contraseña" component={CambiarContrasenaScreen} options={{
                drawerIcon: ({ color }) => <Icon name="lock-reset" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Cerrar Sesión" component={LogoutScreen} options={{
                drawerIcon: ({ color }) => <Icon name="logout" size={22} color={color} />,
            }} />
        </Drawer.Navigator>
    );
}
