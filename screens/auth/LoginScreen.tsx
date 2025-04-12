import {useState} from "react";
import {Alert, Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View,} from "react-native";
import {useAuth} from "../../context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {PublicDrawerParamList} from "../../types/navigation/PublicDrawerParamList";
import {DrawerNavigationProp} from "@react-navigation/drawer";

type NavigationType = DrawerNavigationProp<PublicDrawerParamList, "Iniciar Sesión">;

export default function LoginScreen() {
    const {login} = useAuth();
    const [cedula, setCedula] = useState("");
    const [clave, setClave] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationType>();

    const handleLogin = async () => {
        setLoading(true);
        const result = await login(cedula, clave);
        setLoading(false);

        if (result !== "success") {
            Alert.alert("Error de inicio de sesión", result);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-white justify-center px-6">
                <Text className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</Text>

                <Text className="mb-1">Cédula</Text>
                <TextInput
                    value={cedula}
                    onChangeText={setCedula}
                    placeholder="Ej: 00112345678"
                    className="border border-gray-300 rounded px-3 py-2 mb-4"
                    keyboardType="numeric"
                />

                <Text className="mb-1">Contraseña</Text>
                <TextInput
                    value={clave}
                    onChangeText={setClave}
                    placeholder="Contraseña"
                    secureTextEntry
                    className="border border-gray-300 rounded px-3 py-2 mb-6"
                />

                <Pressable
                    onPress={handleLogin}
                    className="bg-blue-600 py-3 rounded items-center"
                    disabled={loading}
                >
                    <Text className="text-white font-bold">
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Recuperar Contraseña")}
                    className="mt-4"
                >
                    <Text className="text-blue-500">¿Olvidaste tu contraseña?</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}
