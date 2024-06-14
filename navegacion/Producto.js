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

export default function CrearCuenta() {

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
        <Text style={styles.titulo}>Productos</Text>
        <TextInput style={styles.txtInput} placeholder="Nombre Producto" />
        <TextInput
          style={styles.txtInput}
          placeholder="Código Producto"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Cantidad"
          keyboardType="numeric"
        //   secureTextEntry={true}
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Fecha Caducidad"
          keyboardType="ascii-capable"
        //   secureTextEntry={true}
        />
        
        <TouchableOpacity onPress={()=>{Navigation.navigate("home")}}>
          <Text style={styles.btnLoginText}>Guardar</Text>
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
    resizeMode: "contain"
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
