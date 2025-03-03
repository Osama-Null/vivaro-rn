import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text>
          <Feather name="user-plus" size={70} color="orange" />
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
          placeholder="First Name"
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
          placeholder="Last Name"
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
        <TextInput
          placeholder="Confirm Password"
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
        >
          <Text
            style={{
              color: "#282A36",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Register
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
          Already have an account?{"  "}
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={{ color: "orange", fontWeight: "bold", fontSize: 20 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#282A36",
  },
});
