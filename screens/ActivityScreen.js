import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import { UserType } from "../UserContext";
import User from "../components/User";

export default function ActivityScreen() {
  const ios = Platform.OS == "ios";
  const handleButtonClick = (buttonName) => {setselectedButton(buttonName)};
  const [selectedButton, setselectedButton] = useState("people");
  const [content, setContent] = useState('People Content');
  const [users, setUsers] = useState([]);
  const {userId,setUserId}= useContext(UserType);
  useEffect(()=>{
    const fetchUsers = async()=>{
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios.get(`http://192.168.161.98:3000/users/${userId}`).then((response)=>{
        setUsers(response.data)
      }).catch((error)=>{
        console.log('Error',error);
      })
      
    }
    fetchUsers();
  },[])
  
  
  return (
    
      <ScrollView style={{ paddingTop: 50 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Activity</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 12,
            }}
          >
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  borderColor: "#D0D0D0",
                  borderRadius: 6,
                  borderWidth: 0.7,
                },
                selectedButton === "people"
                  ? { backgroundColor: "black" }
                  : null,
              ]}
              onPress={() => handleButtonClick("people")}
            >
              <Text
                style={[
                  {
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                  selectedButton === "people"
                    ? { color: "white" }
                    : { color: "black" },
                ]}
              >
                People
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  borderColor: "#D0D0D0",
                  borderRadius: 6,
                  borderWidth: 0.7,
                },
                selectedButton === "all" ? { backgroundColor: "black" } : null,
              ]}
            >
              <Text
                style={[
                  {
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                  selectedButton === "all"
                    ? { color: "white" }
                    : { color: "black" },
                ]}
                onPress={() => handleButtonClick("all")}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  borderColor: "#D0D0D0",
                  borderRadius: 6,
                  borderWidth: 0.7,
                },
                selectedButton === "request"
                  ? { backgroundColor: "black" }
                  : null,
              ]}
              onPress={() => handleButtonClick("request")}
            >
              <Text
                style={[
                  {
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                  selectedButton === "request"
                    ? { color: "white" }
                    : { color: "black" },
                ]}
              >
                Request
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {
              selectedButton==='people'&& (
                <View style={{marginTop:20}}>
                  {
                    users?.map((item,index)=>(
                      <User key={index} item={item}/>

                    ))
                  }
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
    
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
