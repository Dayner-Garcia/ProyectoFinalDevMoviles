import { createDrawerNavigator } from '@react-navigation/drawer';


import LoginScreen from '../../screens/auth/LoginScreen';
import HomeScreen from '../../screens/home/HomeScreen';
import HistoriaScreen from '../../screens/historia/HistoriaScreen';
import ServiciosScreen from '../../screens/servicios/ServiciosScreen';
import VideosScreen from '../../screens/videos/VideosScreen';
import MiembrosScreen from '../../screens/miembros/MiembrosScreen';
import NoticiasListScreen from '../../screens/noticias/NoticiasListScreen';
import QuieroSerVoluntarioScreen from '../../screens/voluntariado/QuieroSerVoluntarioScreen';
import AcercaDeScreen from '../../screens/about/AcercaDeScreen';
import RecoverPasswordScreen from '../../screens/auth/RecoverPasswordScreen';
import MedidasStack from '../stacks/MedidasStack';
import AlberguesStack from '../stacks/AlberguesStack';
import CustomDrawerContent from "../common/CustomDrawerContent";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

export default function PublicDrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Inicio"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: '#2563EB',
                drawerInactiveTintColor: '#6B7280',
                drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
            }}
        >
            <Drawer.Screen name="Inicio" component={HomeScreen} options={{
                drawerIcon: ({ color }) => <Icon name="home-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Historia" component={HistoriaScreen} options={{
                drawerIcon: ({ color }) => <Icon name="book-open-variant" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Servicios" component={ServiciosScreen} options={{
                drawerIcon: ({ color }) => <Icon name="hammer-screwdriver" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Noticias" component={NoticiasListScreen} options={{
                drawerIcon: ({ color }) => <Icon name="newspaper-variant-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Videos" component={VideosScreen} options={{
                drawerIcon: ({ color }) => <Icon name="video-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Albergues" component={AlberguesStack} options={{
                drawerIcon: ({ color }) => <Icon name="home-group" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Medidas Preventivas" component={MedidasStack} options={{
                drawerIcon: ({ color }) => <Icon name="shield-alert-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Miembros" component={MiembrosScreen} options={{
                drawerIcon: ({ color }) => <Icon name="account-group-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Quiero ser Voluntariado" component={QuieroSerVoluntarioScreen} options={{
                drawerIcon: ({ color }) => <Icon name="account-heart-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Acerca de" component={AcercaDeScreen} options={{
                drawerIcon: ({ color }) => <Icon name="information-outline" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Iniciar Sesión" component={LoginScreen} options={{
                drawerIcon: ({ color }) => <Icon name="login" size={22} color={color} />,
            }} />
            <Drawer.Screen name="Recuperar Contraseña" component={RecoverPasswordScreen} options={{
                drawerItemStyle: { display: 'none' }
            }} />
        </Drawer.Navigator>
    );
}
