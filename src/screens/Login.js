import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import Feather from "@expo/vector-icons/Feather";

const Login = () => {
  const navigation = useNavigation();
  // const { isAuth, setIsAuth } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <Text>
          <Feather name="user" size={80} color="orange" />
        </Text>
      </View>
      {/* Input */}
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          gap: 20,
        }}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor={"rgba(250, 250, 250, 0.64)"}
          style={{
            paddingLeft: 20,
            height: 40,
            width: "90%",
            padding: 1,
            borderRadius: 10,
            flexDirection: "row",
            backgroundColor: "rgba(255, 255, 255, 0.34)",
            justifyContent: "center",
          }}
        ></TextInput>
        <TextInput
          placeholder="Password"
          placeholderTextColor={"rgba(250, 250, 250, 0.64)"}
          style={{
            paddingLeft: 20,
            height: 40,
            width: "90%",
            padding: 1,
            borderRadius: 10,
            flexDirection: "row",
            backgroundColor: "rgba(255, 255, 255, 0.34)",
            justifyContent: "center",
          }}
        ></TextInput>
        <TouchableOpacity
          // onPress={() => navigation.replace("Home")}
          style={{
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 10,
            width: "90%",
            alignItems: "center",
          }}
          onPress={() => {
            setIsAuth(true);
            onSuccess: () => {
              alert("Login Successful");
              // setIsAuth(true);
            };
          }}
        >
          <Text
            style={{
              color: "#282A36",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View
        flexDirection="row"
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          Don't have an account?{"  "}
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={{ color: "orange", fontWeight: "bold", fontSize: 20 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#282A36",
  },
});
