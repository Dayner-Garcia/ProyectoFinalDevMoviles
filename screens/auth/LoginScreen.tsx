import {Pressable, Text, View} from "react-native";
import {useAuth} from "../../context/AuthContext";
import React from "react";

export default function LoginScreen() {
    const { login } = useAuth();

    return (
        <View className="flex-1 bg-white items-center justify-center">
            <Text className="text-xl font-bold mb-4">Login</Text>

            <Pressable
                className="bg-blue-600 px-5 py-2 rounded"
                onPress={login}
            >
                <Text className="text-white font-semibold">Iniciar sesión</Text>
            </Pressable>
        </View>
    );
}