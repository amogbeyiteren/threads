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
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";
  const navigation = useNavigation();
  useEffect(()=>{
    const checkLoginStatus = async()=>{
      try{
        const token = await AsyncStorage.getItem('authToken');
        if(token){
            setTimeout(()=>{
              navigation.navigate("Main");

            }, 400)
        }
      }
      catch(error){
        console.log("Error",error)
      }
    }
    checkLoginStatus();
  },[]
  )

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://192.168.161.98:3000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        

        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert("Login failed", "An Error occured");
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
            Login To Your Account
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
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
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            alignItems: "center",
            justifyContent: "space-between",
            width: 300,
          }}
        >
          <Text>Keep Me Logged In</Text>
          <Text style={{ fontWeight: 500, color: "#007fff" }}>
            Forgot Password?
          </Text>
        </View>
        <View style={{ marginTop: 30 }} />
        <TouchableOpacity
          style={{
            width: 200,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            borderRadius: 6,
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Login
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
              navigation.navigate("Register");
            }}
          >
            Don't Have An Account? Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
