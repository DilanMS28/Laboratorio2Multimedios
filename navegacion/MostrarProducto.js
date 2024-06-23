import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../AccesoFirebase";
import { ScrollView } from "react-native-gesture-handler";

const db = getFirestore(app);

export default function MostrarProducto(props) {
  const Navigation = useNavigation();
  const [producto, setProducto] = useState([]);

  

  const getProducto = async (id) => {
    try {
      const ref = doc(db, "Product", id);
      const datos = await getDoc(ref);
      setProducto(datos.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducto(props.route.params.productoId);
  }, []);

  const CambioText = (nombre, value)=>{
    setProducto({...producto, [nombre]:value})
  }

  const eliminarProducto = async (id)=>{
    await deleteDoc(doc(db,"Product", id));
    alert("Producto Eliminado Exitosamente")
    Navigation.navigate("listar")
  }
  const actualizarProducto = async (id)=>{
    await updateDoc(doc(db,"Product", id), producto);
    alert("Producto Actualizado Exitosamente")
    Navigation.navigate("listar")
  }

  // const actualizarProducto = async (id, nuevosDatos) => {
  //   try {
  //     const productoRef = doc(db, 'Product', id);
  //     await updateDoc(productoRef, nuevosDatos);
  //     alert('Producto Actualizado Exitosamente');
  //     Navigation.navigate('listar');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/logo-se.png")}
          style={styles.Background}
        >
          <Image
            source={require("../assets/logo_fruit-sf.png")}
            style={{
              margin: 20,
              width: 200,
              height: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </ImageBackground>

        <Text style={styles.titulo}>Producto</Text>


        <View style={styles.tarjeta}>

            <Text style={styles.txtProducto}>Nombre:</Text>
        <TextInput style={styles.txtInput} placeholder="Nombre" keyboardType="ascii-capable" value={producto.nombre} onChangeText={(value)=>CambioText("nombre", value)}/>
            <Text style={styles.txtProducto}>Código:</Text>
        <TextInput style={styles.txtInput} placeholder="Código" keyboardType="ascii-capable" value={producto.codigo} onChangeText={(value)=>(CambioText("codigo", value))}/>
            <Text style={styles.txtProducto}>Cantidad:</Text>
        <TextInput style={styles.txtInput} placeholder="Cantidad" keyboardType="ascii-capable" value={producto.cantidad} onChangeText={(value)=>(CambioText("cantidad", value))}/>
            <Text style={styles.txtProducto}>Fecha Caducidad:</Text>
        <TextInput style={styles.txtInput} placeholder="Fecha Caducidad" keyboardType="ascii-capable" value={producto.fecha} onChangeText={(value)=>(CambioText("fecha", value))}/>




          <View style={{display:"flex", justifyContent: "space-around", alignContent:"center", flexDirection: "row", marginTop:10}}>
            <TouchableOpacity onPress={()=>{eliminarProducto(props.route.params.productoId)}}>
              <Text style={styles.txtEliminar}>Eliminar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>actualizarProducto(props.route.params.productoId)}>
              <Text style={styles.txtEditar}>Editar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tarjeta: {
    backgroundColor: "#D9D9D9",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  titulo: {
    Color: "#000",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  Background: {
    flex: 1,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomStartRadius: 20,
    zIndex: -1,
    resizeMode: "center",
  },
  txtInput: {
    backgroundColor: "#fff",
    marginRight: "auto",
    marginLeft: "auto",
    width: "95%",
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    marginBottom: 15,
  },
  txtCrearCuenta: {
    color: "#fff",
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  txtRegistrarse: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  btnLoginText: {
    backgroundColor: "#871F1F",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    width: 200,
    height: 40,
    borderRadius: 10,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  txtProducto: {
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "normal",
    fontSize: 18,
  },
  txtEliminar:{
    color:"#c00000",
    fontSize:20,
    fontWeight: "bold",
    backgroundColor: "white",
    padding:10,
    borderRadius: 15,
  },
  txtEditar:{
    color:"#8db600",
    fontSize:20,
    fontWeight: "bold",
    backgroundColor: "white",
    padding:10,
    borderRadius: 15,
  },
});
