
import { Text, View, FlatList,Image, StyleSheet,Animated,SafeAreaView,Dimensions} from "react-native";
import { HomeInfon } from "types/HomeScreen/HomeInfon";
import React from "react";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.9;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;


export default function HomeScreen() {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={style.container}>
            <View style={style.containerTitulo}>

                <Text  style={style.titulo}>Defensa civil de la republica dominicana</Text>
  
            </View>
              <Animated.FlatList 
                   onScroll={Animated.event([{
                        nativeEvent:{contentOffset:{x:scrollX} }}],
                        {useNativeDriver:true}
                            )}
                   
                   showsHorizontalScrollIndicator={false}
                   horizontal={true}
                   snapToAlignment='start'
                   contentContainerStyle={{
                    paddingTop:100,
                    paddingHorizontal: ESPACIO_CONTENEDOR
                   }}
                   snapToInterval={ANCHO_CONTENEDOR}
                   decelerationRate={0}
                   scrollEventThrottle={16}
                   data={HomeInfon}
                   keyExtractor={(item,index)=> index.toString()}
                   renderItem={({item, index})=> {

                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,
                        index * ANCHO_CONTENEDOR,
                        (index + 1) * ANCHO_CONTENEDOR,
                      ];
            
                      const scrollY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -50, 0],
                      });
                        return(
                            <View style={{width: ANCHO_CONTENEDOR}}>
                                <Animated.View style={{
                                            marginHorizontal: 10,
                                            padding: 0,
                                            borderRadius: 34,
                                            backgroundColor: "#fff",
                                            alignItems: "center",
                                            transform: [{ translateY: scrollY }],
                                            }}>
                                    <Image style={style.imagen}source={item.image}/>
                            
                                </Animated.View>
                                
                            </View>
                        );
                    }}
                    />
        
        </SafeAreaView>
        
    );
}

const style = StyleSheet.create({
    container:{ 
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",},
    imagen:{
        width: "100%",
        height: ANCHO_CONTENEDOR * 1.2,
        resizeMode: "cover",
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
        },
    titulo:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,},

    containerTitulo:{ 
        backgroundColor: '#0D1F2D', 
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#F57C00',
        marginBottom: 20,
        alignItems: 'center'}
})