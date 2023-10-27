import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name,
      email,
      password
    };
    console.log(user);
    axios
      .post("http://192.168.161.98:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert("Registration Successful");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert("Registration failed", "An Error occured");
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView style={ios ? styles.ios : styles.android}>
      <View style={{ marginTop: 50 }}>
        <Image
          style={{ width: 250, height: 180, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
          //@symbol
        ></Image>
      </View>
      <KeyboardAvoidingView
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: "25" }}>
            Register Your Account
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholderTextColor={"gray"}
              placeholder="Enter your Name"
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              value={name}
              onChangeText={(text) => setName(text)}
              fontSize={name ? 16 : 16}
            />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholderTextColor={"gray"}
              placeholder="Enter your Email"
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              fontSize={email ? 16 : 16}
            />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <AntDesign
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              secureTextEntry={true}
              placeholderTextColor={"gray"}
              placeholder="Enter your Password"
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              value={password}
              onChangeText={(text) => setPassword(text)}
              fontSize={password ? 16 : 16}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            marginHorizontal: "auto",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Already Have An Account? Log In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  ios: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  android: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
  },
});
