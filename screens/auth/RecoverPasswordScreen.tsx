import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { recuperarContrasena } from "../../services/authService";

export default function RecoverPasswordScreen() {
    const [cedula, setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!cedula.trim() || !correo.trim()) {
            Alert.alert("Campos requeridos", "Por favor completa todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const res = await recuperarContrasena(cedula, correo);
            Alert.alert("Recuperación", res.mensaje);
            if (res.exito) {
                setTimeout(() => navigation.goBack(), 1000); // vuelve atrás si fue exitoso
            }
        } catch (e) {
            Alert.alert("Error", "Hubo un problema al recuperar la contraseña.");
        }
        setLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-white justify-center px-6">
                <Text className="text-2xl font-bold mb-6 text-center">
                    Recuperar Contraseña
                </Text>

                <Text className="mb-1">Cédula</Text>
                <TextInput
                    value={cedula}
                    onChangeText={setCedula}
                    placeholder="Ej: 00112345678"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <Text className="mb-1">Correo electrónico</Text>
                <TextInput
                    value={correo}
                    onChangeText={setCorreo}
                    placeholder="Ej: ejemplo@correo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="border border-gray-300 rounded px-3 py-2 mb-6"
                />

                <Pressable
                    onPress={handleSubmit}
                    className="bg-green-600 py-3 rounded items-center mb-3"
                    disabled={loading}
                >
                    <Text className="text-white font-bold">
                        {loading ? "Enviando..." : "Recuperar Contraseña"}
                    </Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} className="items-center">
                    <Text className="text-blue-500">← Volver al login</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}
