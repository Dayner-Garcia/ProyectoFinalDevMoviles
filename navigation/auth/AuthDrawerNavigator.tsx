import { createDrawerNavigator } from '@react-navigation/drawer';

import LogoutScreen from '../../screens/auth/LogoutScreen';
import LineasASeguirScreen from '../../screens/noticias/LineasASeguirScreen';
import CambiarContrasenaScreen from '../../screens/perfil/CambiarContrasenaScreen';
import MapaSituacionesScreen from '../../screens/situaciones/MapaSituacionesScreen';
import ReportarSituacionScreen from '../../screens/situaciones/ReportarSituacionScreen';
import SituacionesStack from '../stacks/SituacionesStack';

const Drawer = createDrawerNavigator();

export default function AuthDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Noticias Internas">
      <Drawer.Screen name="Noticias Internas" component={LineasASeguirScreen} />
      <Drawer.Screen name="Reportar Situación" component={ReportarSituacionScreen} />
      <Drawer.Screen name="Mis Situaciones" component={SituacionesStack} />
      <Drawer.Screen name="Mapa de Situaciones" component={MapaSituacionesScreen} />
      <Drawer.Screen name="Cambiar Contraseña" component={CambiarContrasenaScreen} />
      <Drawer.Screen name="Cerrar Sesión" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}