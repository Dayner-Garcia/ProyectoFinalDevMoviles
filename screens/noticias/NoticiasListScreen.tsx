import { Text, View,FlatList,Image,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity} from "react-native";
import { Notice } from "types/notice/notice";
import { obtenerNoticias } from "services/noticiasService";
import React,{useState,useEffect} from "react";

export default function NoticiasListScreen() {

    const [noticias,setNoticias] = useState<Notice[]>([]);
    const [loandig,setLoding] = useState(true)
    const [expandedId, setExpandedId] = useState<string | null>(null); 

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id); 
      };

    useEffect(() =>{

        const fetchNoticias = async () =>{
            try{
                const res = await obtenerNoticias();
                setNoticias(res.datos);
            }
            catch(e){
                console.error("error",e);
            }
        }
    fetchNoticias()});
    
    
    
    return (

        <SafeAreaView style={style.container}>

            <FlatList 

                data={noticias}
                keyExtractor={({id},index)=> id.toString()}
                renderItem={({item}) =>{
                    return(
                            <View style = {style.card}>
                                <TouchableOpacity onPress={()=> toggleExpand(item.id)}>
                                  
                                   <View style={style.tituloheader}>
                                        <Text style={style.titulo}>{item.titulo}</Text>
                                   </View>
                                    <Image style={style.foto} source={{uri:item.foto}}/>
                                   <Text style={{textAlign:'right'}}> Mostrar mas  </Text>
                                    
                                
                                { expandedId === item.id &&(
                                        <View style={style.contenidotext}>

                                            <Text>{item.contenido}</Text>
                                            <Text>{item.fecha_publicacion}</Text>

                                        </View>
                                    )
                                }
                                </TouchableOpacity>
                              
                            </View>)
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
    foto:{
        width:250,
        height:150,
        alignSelf:'center',
        borderRadius:16,

    },
    card:{
        alignSelf:"center",
        margin:10,
        borderRadius:16,
        width:'95%',
        backgroundColor:"#eeeeee",
        elevation:5
    },
    header:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
        backgroundColor: '#0D1F2D', 
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#F57C00',
        marginBottom: 20,
        alignItems: 'center'
    },
    tituloheader:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
        backgroundColor: '#0D1F2D', 
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 4,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius:16,

    },
    titulo:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
    },
    contenidotext:{
       fontSize:14,
       textAlign:'justify',
       margin:20,
    }
})