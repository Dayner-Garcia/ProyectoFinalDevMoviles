import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image } from 'react-native';

export default function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="items-center bg-orange-500 py-6 px-4 rounded-b-3xl shadow-lg shadow-black/20">
                <View className="bg-white p-1 rounded-full mb-2">
                    <Image
                        source={require('../../assets/icon.png')}
                        className="w-24 h-24 rounded-full"
                    />
                </View>
                <Text className="text-white text-lg font-extrabold">Defensa Civil</Text>
            </View>

            <View className="flex-1 bg-white pt-3">
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}
