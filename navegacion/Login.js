import { StatusBar } from "expo-status-bar";
import {Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const Navegation = useNavigation()
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/img_fondo.jpg")}
        style={styles.Background}
      >
        <View style={{backgroundColor:"rgba(0,0,0,0.75)"}}>
        
        <Image source={require("../assets/logo_fruit-sf.png")} style={{margin: 20}}/>

        <TextInput style={styles.txtInput} placeholder="correo electronico" keyboardType="email-address" />
        <TextInput
          style={styles.txtInput}
          placeholder="contraseña"
        //   keyboardType="visible-password"
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={()=>{Navegation.navigate("home")}}>
          <Text style={styles.btnLoginText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{Navegation.navigate("crear")}}>
          <Text style={styles.txtCrearCuenta}>
            Crear cuenta nueva.{" "}
            <Text style={styles.txtRegistrarse}>Registrate</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.txtRegistrarse}>¿Has olvidado tu contraseña?</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Background: {
    flex: 1,
    resizeMode: "cover",
    color: "rgba(0,0,0,0.75)"
  },
  txtInput:{
    backgroundColor: "#fff",
    marginRight: "auto",
    marginLeft: "auto",
    width: "95%",
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    marginBottom: 20,
  },
  txtCrearCuenta:{
    color: "#fff",
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,

  },
  txtRegistrarse:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  btnLoginText:{
    backgroundColor: "#871F1F",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    width: 200,
    height: 40,
    borderRadius: 10,
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  }
});
