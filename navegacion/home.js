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

export default function Home() {

    const Navigation = useNavigation()

  return (
    <View style={styles.container}>
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

      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Inicio</Text>
        
        <TouchableOpacity onPress={()=>{Navigation.navigate("crear")}}>
          <Text style={styles.btnLoginText}>Crear Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{Navigation.navigate("producto")}}>
          <Text style={styles.btnLoginText}>Ingresar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{Navigation.navigate("login")}}>
          <Text style={styles.btnLoginText}>Cerrar Sesion</Text>
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
    marginTop: -60,
    marginBottom: 60,
    // height: 350,
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
});
