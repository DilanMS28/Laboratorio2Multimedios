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
} from "firebase/firestore";
import app from "../AccesoFirebase";
import { ScrollView } from "react-native-gesture-handler";

const db = getFirestore(app);

export default function ActualizarProducto(props) {
  const Navigation = useNavigation();
  const [producto, setProducto] = useState([]);


  // const getProducto = async (id) => {
  //   try {
  //     const ref = doc(db, "Product", id);
  //     const datos = await getDoc(ref);
  //     setProducto(datos.data());
  //   //   console.log(datos)
  //     console.log(producto)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProducto(props.route.params.productoId);
  // }, []);

  const actualizarProducto = async (id, nuevosDatos) => {
    try {
      const productoRef = doc(db, 'Product', id);
      await updateDoc(productoRef, nuevosDatos);
      alert('Producto Actualizado Exitosamente');
      Navigation.navigate('listar');
    } catch (error) {
      console.error(error);
    }
  };



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

        <Text style={styles.titulo}>Actualizar Producto</Text>

        <Text style={styles.titulo}>{producto.nombre}</Text>

        <TextInput style={styles.txtInput} placeholder="Nombre" keyboardType="ascii-capable" value={producto.nombre} onChangeText={producto.nombre}/>
        <TextInput style={styles.txtInput} placeholder="Código" keyboardType="ascii-capable"/>
        <TextInput style={styles.txtInput} placeholder="Cantidad" keyboardType="ascii-capable" />
        <TextInput style={styles.txtInput} placeholder="Fecha Caducidad" keyboardType="ascii-capable"/>

        <TouchableOpacity>
          <Text style={styles.btnLoginText}>Actualizar</Text>
        </TouchableOpacity>


    
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
    marginBottom: 10,
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
