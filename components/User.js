import { View, Text, Image, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { UserType } from "../UserContext";

export default function User({ item }) {
  const { userId, setUserId } = useContext(UserType);
  console.log(userId);
  const [requestSent, setRequestSent] = useState(false);
  const sendFollow = async (currentuserId, selectedUserId) => {
    try {
      const response = await fetch("http://192.168.161.98:3000/follow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ currentuserId, selectedUserId }),
      });
      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleUnFollow = async (targetId) => {
    try {
      const response = await fetch("http://192.168.161.98:3000/users/unfollow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          loggedInUserId: userId,
          targetUserId: targetId,
        }),
      });
      if (response.ok) {
        setRequestSent(false);
        console.log('Unfollowed Successfully')
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 5,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text style={{ fontSize: 15, fontWeight: 500, flex: 1 }}>
          {item?.name}
        </Text>
        {requestSent || item?.followers?.includes(userId) ? (
          <Pressable
            style={{
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 7,
              padding: 10,
              marginLeft: 10,
              width: 100,
            }}
            onPress={() => handleUnFollow(item?._id)}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              Following
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 7,
              padding: 10,
              marginLeft: 10,
              width: 100,
            }}
            onPress={() => sendFollow(userId, item._id)}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              Follow
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
