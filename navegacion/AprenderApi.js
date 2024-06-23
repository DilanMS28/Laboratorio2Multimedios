import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../AccesoFirebase";
import { fetchConfig } from "firebase/remote-config";
import { ScrollView } from "react-native-gesture-handler";

const db = getFirestore(app);

export default function AprenderApi() {
  const Navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [isLoadingF, setLoadingF] = useState(true);
  const [data, setData] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [añadido, setAñadido] = useState(false);
  const [frutasFiltradas, setFrutasFiltradas] = useState(data);

  const getProducto = async () => {
    try {
      const response = await fetch("https://www.fruityvice.com/api/fruit/all");
      const json = await response.json();
      // console.log(data);
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducto();
  }, []);


  const handleSearch = (text) => {
    const filteredFrutas = data.filter( (fruta) =>
      fruta.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFrutasFiltradas(filteredFrutas);
  };


  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-around", alignItems: "center" }}>
        <TextInput placeholder="Nombre Fruta" style={styles.txtInput} onChangeText={handleSearch} />
        {/* <Image
          source={require("../assets/logo_fruit-sf.png")}
          style={{
            marginRight: 20,
            width: 50,
            height: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        /> */}
        <TouchableOpacity>
          <MaterialCommunityIcons name="card-search" size={60} color={"#871F1F"} />
        </TouchableOpacity>

      </View>


      <Text style={styles.titulo}>Productos</Text>
      <View style={{ flex: 1 }}>

        {/* <View style={{ flex: 1, padding: 24 }}> */}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View style={styles.tarjeta}>
                <Text>Nombre: {item.name}</Text>
              </View>
            )}
          />
        )}
        {/* </View> */}


        {isLoadingF ? (<ActivityIndicator />): (
          <FlatList
          data={frutasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.nombre}</Text>
          )}
        />
        )
        }


        

        <TouchableOpacity onPress={() => Navigation.navigate("login")}>
          <Text style={styles.btnLoginText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      
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
    // marginTop: 60,
    marginBottom: 10,
    // height: 50,
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
    backgroundColor: "#FFF",
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
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

});
