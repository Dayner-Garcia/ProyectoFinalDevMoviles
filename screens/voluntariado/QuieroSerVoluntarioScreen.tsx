import {useState} from "react";
import {Alert, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {enviarSolicitudVoluntario} from "../../services/voluntariadoService";
import {VoluntarioRequest} from "../../types/voluntariado/VoluntarioRequest";

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
        setForm({...form, [field]: value});
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
                setForm({cedula: "", nombre: "", apellido: "", clave: "", correo: "", telefono: ""});
            } else {
                Alert.alert("Error", response.mensaje);
            }
        } catch (e) {
            Alert.alert("Error", "Hubo un problema al registrar el voluntario.");
        }
        setLoading(false);
    };

    return (
        <ScrollView contentContainerStyle={{padding: 20}}>
            <Text className="text-2xl font-bold mb-4 text-center">Regisitrar Voluntariado</Text>

            {[
                {label: "Cédula", field: "cedula", keyboard: "numeric"},
                {label: "Nombre", field: "nombre"},
                {label: "Apellido", field: "apellido"},
                {label: "Contraseña", field: "clave", secure: true},
                {label: "Correo", field: "correo", keyboard: "email-address"},
                {label: "Teléfono", field: "telefono", keyboard: "phone-pad"},
            ].map(({label, field, keyboard, secure}) => (
                <View key={field} className="mb-4">
                    <Text className="mb-1">{label}</Text>
                    <TextInput
                        placeholder={label}
                        value={form[field as keyof typeof form]}
                        onChangeText={(text) => handleChange(field as keyof typeof form, text)}
                        keyboardType={keyboard as any}
                        secureTextEntry={secure}
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                </View>
            ))}

            <Pressable
                onPress={handleSubmit}
                className="bg-green-600 py-3 rounded items-center"
                disabled={loading}
            >
                <Text className="text-white font-bold">
                    {loading ? "Enviando..." : "Enviar solicitud"}
                </Text>
            </Pressable>
        </ScrollView>
    );
}
