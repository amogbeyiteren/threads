import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
  Button,
} from "react-native";
import { UserType } from "../UserContext";
import React, { useState, useContext } from "react";
import axios from "axios";

export default function ThreadScreen() {
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const ios = Platform.OS == "ios";

  const handlePostSubmit = () => {
    const postData = { userId };
    if (content) {
      postData.content = content;
    }
    axios
      .post("http://192.168.161.98:3000/create-post", postData)
      .then((response) => {
        setContent("");
      })
      .catch((error) => {
        console.log("Error creating Post", error);
      });
  };
  return (
    <SafeAreaView style={ios ? styles.ios : styles.android}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
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
            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAggMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgcFBAMBAv/EADsQAAEDAgIFCAgEBwAAAAAAAAABAgMEBQYREiExQWETF1FVcYGRkwciM0JiobHRFnLBwhQVIyQyUlP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADhYpxDHZKZGsRH1cvs2LsT4l4fUDpXC5Udti5WuqGQt3aS617E2qTdVj+gjdlTUs8yf7LkxF8dZAVlXUV07p6uZ0srtrnfp0dx8QNAh9INM52U1BMxvS16O+xQWrEFtuqoylqW8r/yemi7wXb3GPn61Va5HNVWuRc0VFyVANzBF4NxS+qey3XN+lMuqKZff+FePHf2loAAAAAAAAAAAAAAfy9yMarnLk1qZqvQhjV5uL7rcp6yRVye71EX3Wbk8DVMTSrDh+4PbtSByJ3pkY8AAAUAAH61zmORzFVrmqio5NqKbBhy4/wA0s9PVO9o5ujJ+ZNSmPGiejSVXWyrjXPJk+ad7U+wRYAAAAAAAAAAAAAPFe6Zay0VlO1M3SQuaicctRjBuhlWMrM613R8sbV/hqlyvjVE1NXe0DgAAKAAAaT6Oad0VkkmcmXLzKrexMk+qKQFtoZrlXRUlM3OSRdu5qb1XghsVBSR0NFDSw+zhYjE45bwj0AAAAAAAAAAAAeW411PbqR9VVP0ImJr6VXoTiB9p54qeF008jY42pm571yRCbW/WPEEstqnz5N/s3yJoo93wruXoIrEF+qr1UaUirHTtX+nCi6k4r0qcgChvmE6+2vc+Bj6qm3PY3NzfzIn1Qnt6oupU1KilDaMX3O3NSORzaqFNSNl/yRODvvmdr8W2GtTO42pdPeqxMf8APaFQmZ07TYrjdXtSlp3JGq65npkxO/f3FR+I8LU3rU1qzemzKnYnzVTw3LHVbO1Y7fCylYqZaa+s9OzcgR2YltGCqRGyOWetly09FE03J2bmoUNrulHdIOWopmyN95uxzeCpuMbllkmldLM90kjlzc5y5qp9qCuqbdUtqKOVY5G+Cp0Km9ANrBxsN3+C90ukiJHUsy5WLo4pwOyAAAAAAAAAXUhlWML467XF0cL/AO0gcrY0T3l3u+3AtsbXFbfY5UjdlLULyTFTdntXwzMqAAAKAAAAAAAA9drr57ZXR1dM7J7F1ouxyb0U2C3VkNwooqqnXOOVuaZ7U4LxMULj0b3FUfUW2RfVVOVi7djk+nzCLwAAAAAAAGeekqpV9ypaX3Y4lf3uXL9vzI41XEOFqa91DKh00kEzWoxXNRFRydnecnm9g6xm8tAIAF/zewdYzeWg5vYOsZvLQKgAX/N7B1jN5aDm9g6xm8tAIAF/zewdYzeWg5vYOsZvLQIgAX/N7B1jL5aDm9g6xl8tAIA6mGKlaTEFDIm+VGL2O1fqVfN7B1jL5aHot+BqSkrIqiSqlmSNyORitRqKqLmmYFaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=",
          }}
        />
        <Text>Abiloye</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          placeholder="Type Your Message..."
          placeholderTextColor={"black"}
          onChangeText={(text) => setContent(text)}
          multiline
        />
      </View>
      <View style={{ marginTop: 20 }}></View>
      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ios: {
    padding: 10,
  },
  android: {
    padding: 10,
    paddingTop: 40,
  },
});
