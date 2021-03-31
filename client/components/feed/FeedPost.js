import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const FeedPost = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details", props.post);
      }}
    >
      <View>
        <Text>{props.post.title}</Text>
        {props.post.image && props.post.image.url && (
          <Image
            source={{ uri: props.post.image.url }}
            style={{ height: 300 }}
          />
        )}
        <Text>Location: {props.post.location}</Text>
        <Text>
          Collect By: {new Date(props.post.collectBy).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeedPost;

const styles = StyleSheet.create({});
