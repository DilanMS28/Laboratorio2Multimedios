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
import { addDoc, collection, getFirestore, waitForPendingWrites,getDocs } from "firebase/firestore";
import app from "../AccesoFirebase";
import { fetchConfig } from "firebase/remote-config";
import { ScrollView } from "react-native-gesture-handler";

const db = getFirestore(app);

export default function AprenderApi() {
  const Navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [isLoadingF, setLoadingF] = useState(true);
  const [data, setData] = useState([]);


  const [initData, setInitData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const getProducto = async () => {
    try {
      const response = await fetch("https://www.fruityvice.com/api/fruit/all");
      const json = await response.json();
      // console.log(data);
      setData(json);
      setInitData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  useEffect(() => {
    if (busqueda == "") {
      setData(initData);
    } else {
      const newData = initData.filter((item) =>
        item.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
      );
      setData(newData);
    }
  }, [busqueda]);

  const recargar = () => {
    setBusqueda("");
    getProducto();
  };

  const agregarFav= async (fruta) => {
    try {
      
      const favoritoref = collection(db, "Favoritos");
      const resp = await getDocs(favoritoref);
      const esFavorito = resp.docs.some(doc => doc.data().id === fruta.id)
      
  
      if (!esFavorito) {
          await addDoc(favoritoref, fruta);
          alert(`${fruta.name} se agregó a favoritos`)
      } else {
        alert(`${fruta.name} Ya pertenece a favoritos`)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Nombre Fruta"
          style={styles.txtInput}
          value={busqueda}
          onChangeText={setBusqueda}
        />

        <TouchableOpacity onPress={() => recargar()}>
          <MaterialCommunityIcons
            name="card-search"
            size={60}
            color={"#871F1F"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>Navigation.navigate("listarFavoritos")}>
        <Text style={styles.btnLoginText}>Favoritos</Text>
      </TouchableOpacity>

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
                <Text>Codigo: {item.id}</Text>
                <Text>Nombre: {item.name}</Text>
                <Text>Familia: {item.family}</Text>
                <Text style={{ fontWeight: "bold" }}>----------Ficha Nutricional----------</Text>
                <Text>
                  {"\t"}Calorías: {item.nutritions.calories}
                </Text>
                <Text>
                  {"\t"}Fat: {item.nutritions.fat}
                </Text>
                <Text>
                  {"\t"}Azucar: {item.nutritions.sugar}
                </Text>
                <Text>
                  {"\t"}Carbohidratos: {item.nutritions.carbohydrates}
                </Text>
                <Text>
                  {"\t"}Proteina: {item.nutritions.protein}
                </Text>

                <TouchableOpacity onPress={() => {agregarFav(item)}}>
                    <Text style={styles.fav}> <MaterialCommunityIcons name="heart" size={20} color={"#871F1F"} /> Agregar a Favorito</Text>
                </TouchableOpacity>

              </View>
            )}
          />
        )}
        {/* </View> */}

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
    marginTop: 5,
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
