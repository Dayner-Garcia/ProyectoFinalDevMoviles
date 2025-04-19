import { Text, View,FlatList,Image,SafeAreaView,StyleSheet} from "react-native";
import { obtenerServicios } from "services/serviciosService";
import { servicios } from "types/servicios/servicios";
import React,{useEffect,useState} from "react";


export default function ServiciosScreen() {


   const [Servicio,setServicios] = useState<servicios[]>([]);

   useEffect(()=>{
         const fetchServicios= async () =>{
             try{
        
                const res = await obtenerServicios();
                setServicios(res.datos);
             }
             catch(e){
                console.error("error",e)
             }

         }
         fetchServicios()
   });

    return (
        <SafeAreaView style={style.container}>
                
                            <FlatList  
                            data={Servicio}
                            keyExtractor={({id},index)=> id.toString()}
                            renderItem={({item})=>{
                                return(
                                    <View style={style.card}> 
                                    <Image style={style.foto} source={{uri:item.foto}} />
                                        <Text style={style.titulo}>{item.nombre}</Text>
                                        <Text style={style.contenido}>{item.descripcion}</Text>
                                       
                                    </View>
                                )}}
                            
                            />
            

        </SafeAreaView>
        
    );
}
const style = StyleSheet.create({
    container:{ 
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",},
        foto:{
            width:"100%",
            height:150,
            alignSelf:'flex-start',
            borderRadius:16,
    
        },
        card:{
            alignSelf:"center",
            margin:10,
            borderRadius:16,
            width:'95%',
            backgroundColor:"#eeeeee",
            elevation:5},
        titulo:{
            fontSize:18,
            fontWeight:'bold',
            textAlign:'center'
        },
        contenido:{
            textAlign:'justify',
            margin:16
            
        }
})