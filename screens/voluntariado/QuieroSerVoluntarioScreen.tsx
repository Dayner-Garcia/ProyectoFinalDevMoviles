import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { enviarSolicitudVoluntario } from "../../services/voluntariadoService";
import { VoluntarioRequest } from "../../types/voluntariado/VoluntarioRequest";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function QuieroSerVoluntarioScreen() {
    const [form, setForm] = useState<VoluntarioRequest>({
        cedula: "",
        nombre: "",
        apellido: "",
        clave: "",
        correo: "",
        telefono: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof VoluntarioRequest, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        const campos = Object.entries(form);
        for (const [campo, valor] of campos) {
            if (!valor.trim()) {
                Alert.alert("Campo requerido", `Por favor completa el campo: ${campo}`);
                return;
            }
        }

        setLoading(true);
        try {
            const response = await enviarSolicitudVoluntario(form);
            if (response.exito) {
                Alert.alert("Registro", response.mensaje);
                setForm({ cedula: "", nombre: "", apellido: "", clave: "", correo: "", telefono: "" });
            } else {
                Alert.alert("Error", response.mensaje);
            }
        } catch (e) {
            Alert.alert("Error", "Hubo un problema al registrar el voluntario.");
        }
        setLoading(false);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-white">
            <Text className="text-2xl font-bold text-center text-orange-500 mb-6">
                <Icon name="account-heart-outline" size={22} color="#f97316" /> Quiero ser voluntario
            </Text>

            {[
                { label: "Cédula", field: "cedula", icon: "card-account-details-outline", keyboard: "numeric" },
                { label: "Nombre", field: "nombre", icon: "account" },
                { label: "Apellido", field: "apellido", icon: "account" },
                { label: "Contraseña", field: "clave", icon: "lock-outline", secure: true },
                { label: "Correo", field: "correo", icon: "email-outline", keyboard: "email-address" },
                { label: "Teléfono", field: "telefono", icon: "phone-outline", keyboard: "phone-pad" },
            ].map(({ label, field, icon, keyboard, secure }) => (
                <View key={field} className="mb-5">
                    <Text className="mb-1 text-gray-700 font-semibold">{label}</Text>
                    <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                        <Icon name={icon} size={20} color="#9CA3AF" />
                        <TextInput
                            placeholder={label}
                            value={form[field as keyof typeof form]}
                            onChangeText={(text) => handleChange(field as keyof typeof form, text)}
                            keyboardType={keyboard as any}
                            secureTextEntry={secure}
                            className="ml-2 flex-1 text-base text-gray-800"
                        />
                    </View>
                </View>
            ))}

            <Pressable
                onPress={handleSubmit}
                className="bg-orange-500 py-3 rounded-xl mt-4"
                disabled={loading}
            >
                <Text className="text-white text-center font-bold text-lg">
                    {loading ? "Enviando..." : "📩 Enviar solicitud"}
                </Text>
            </Pressable>
        </ScrollView>
    );
}
