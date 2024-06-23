import { StatusBar } from "expo-status-bar";
import React from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore, getDoc} from "firebase/firestore";
import app from "../AccesoFirebase";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";


const db = getFirestore(app);

export default function ListarProducto(props) {
  const Navigation = useNavigation();
  const [listar, setListar] = useState([])
  const [isLoading, setLoading] = useState(true)


  // useEffect( ()=>{
    const getListar = async ()=>{
        try {
            const qyCollection = await getDocs(collection(db, "Product"));
            // console.log(qyCollection)
            const productos = []
            qyCollection.forEach( (producto)=> {
                // const {cantidad, codigo, fecha, nombre} = producto.data();
                // productos.push({id:producto.id, cantidad, codigo, fecha, nombre});
                // console.log(producto.data())
                productos.push({id:producto.id, ...producto.data()})
            });
            setLoading(false)
            setListar(productos);
        } catch (error) {
            console.log(error)
        }
    };
    // getListar()
  // },[])

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getListar();
    }, [])
  );

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

      <Text style={styles.titulo}>Lista de Productos</Text>


      {isLoading ? (<ActivityIndicator/>):(
        listar.map((lista) => (
          <View style={styles.tarjeta}>
            <TouchableOpacity key={lista.id} onPress={()=>props.navigation.navigate("mostrarProducto", {productoId:lista.id})}>
              <Text style={styles.txtProducto}>Nombre: {lista.nombre}</Text>
              <Text style={styles.txtProducto}>Código: {lista.codigo}</Text>
              {/* <Text style={styles.txtProducto}>Cantidad: {lista.cantidad}</Text> */}
              {/* <Text style={styles.txtProducto}>Fecha Caducidad: {lista.fecha}</Text> */}
            </TouchableOpacity>
          </View>
        ))
      )
      }


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
    borderColor: "rgba(0,0,0,0.15)"
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
    backgroundColor: "#000",
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
  txtProducto:{
    textAlign: "center",
    marginBottom:5,
    fontWeight:"normal",
    fontSize: 18,
  },

});
