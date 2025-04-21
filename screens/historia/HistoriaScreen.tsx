import { Text, View,TouchableOpacity,FlatList,StyleSheet, ScrollView,SafeAreaView,Image} from "react-native";
import WebView from "react-native-webview";
import React,{useState} from "react";
import { media } from "types/historia/historiaInfo";


export default function HistoriaScreen() {


const [currentIndex, setCurrentIndex] = useState(0); // 0 = video,  0!= imagen
  

const goPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View>
            <ScrollView>
                <View style={style.container}>
                    //Botón izquierdo 
                    <TouchableOpacity onPress={goPrevious} style={style.boton}>
                    <Text style={{ fontSize: 24 }}>{'<'}</Text>
                    </TouchableOpacity>

                    // Muestra el video o la imagenes
                    <View style={{ width: '80%', height: 200,borderRadius:20 }}>
                    {media[currentIndex].type === 'video' ? (
                        <WebView
                        javaScriptEnabled
                        style={style.video}
                        source={{ uri: media[currentIndex].uri }}
                        />
                    ) : (
                        <Image
                        source={media[currentIndex].uri}
                        style={style.image}
                        resizeMode="contain"
                        />
                    )}
                    </View>

                    // Botón derecho 
                    <TouchableOpacity onPress={goNext} style={style.boton}>
                    <Text style={{ fontSize: 24 }}>{'>'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={style.historia}>
                    Antes del año 1966, cuando llegaba la temporada de huracanes, un grupo de
                    radioaficionados se reunía en la Cruz Roja para estar atentos por si surgía
                    algún tipo de emergencia, e inmediatamente ponerse a disposición y ayudar en
                    todo lo posible, incluso usando sus propios equipos de comunicación para
                    tener contacto con el exterior en caso de que las redes telefónicas resultaran
                    afectadas.{"\n\n"}

                    Al surgir el triunvirato, fue designado el Dr. Rafael Cantizano Arias como
                    presidente de la Cruz Roja, y al mismo tiempo nombraron al Ing. Carlos D´Franco
                    como director de la Defensa Civil, quien con un grupo compuesto por seis personas,
                    se instaló en la calle Francia esquina Galván, siendo esa la primera oficina
                    de la Defensa Civil.{"\n\n"}

                    Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García Godoy,
                    a los diecisiete días del mes de junio de 1966, fue promulgada la Ley 257,
                    mediante la cual fue creada la Defensa Civil, institución dependiente de la
                    Secretaría Administrativa de la Presidencia (ahora Ministerio de la Presidencia),
                    y quien en la actualidad preside la Comisión Nacional de Emergencias.{"\n\n"}

                    Más adelante, el local fue trasladado a la calle Dr. Delgado No. 164 y luego,
                    en la gestión del Contralmirante Radhamés Lora Salcedo, se reubicó a la
                    Plaza de la Salud, donde aún permanece.
                </Text>
            </ScrollView>
        </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
    container:{ 
        flexDirection: 'row',
         alignItems: 'center', 
         justifyContent: 'center',
          marginVertical: 20 },

    historia:{ paddingHorizontal: 20,
         fontSize: 16,
          textAlign: 'justify' },
    boton:{ 
        padding: 10 },
    video:{
        width: '100%',
        height: 200,
        borderRadius:16,
        marginVertical:-5,
        alignSelf:'center'},
    image:{ 
        width: '100%', 
        height: 200,
         borderRadius:16,
         marginVertical:-5}
})