import { Text, View,FlatList,SafeAreaView,StyleSheet } from "react-native";
import { videos } from "types/Videos/videos";
import { obtenerVideos } from "services/videosService";
import React,{useState,useEffect} from "react";
import WebView from "react-native-webview";

export default function VideosScreen() {
     
    const [video,setVideos]= useState<videos[]>([]);


    useEffect(()=>{
        const fecthVideos= async () =>{
            try{
                   const res= await obtenerVideos()
                   setVideos(res.datos)
            }
            catch(e){
                console.error("error",e)

            }
        }
    fecthVideos()})


    return (
       <SafeAreaView style={style.container}>
                    <FlatList 
                        data={video}
                        renderItem={({item})=>{
                            return(
                                <View style={style.card}>
                                    <Text style={style.titulo}>{item.titulo}</Text>
                                    <WebView style={style.video} source={{uri:`https://www.youtube.com/embed/${item.link}`}}/>
                                    <Text style={style.contenido}>{item.descripcion}</Text>
                                    <Text style={{textAlign:'right', fontSize:9, margin:16}}>{item.fecha}</Text>
                                </View> 
                            )
                        }}
                        
                        
                    />

       </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container:{ 
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",},
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
            
            
        },
        video:{
            width:"95%",
            height:150,
            alignSelf:'center',
            borderRadius:16,
            marginVertical:15
    
        }
})