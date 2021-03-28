import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const FeedPost = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details", props.post);
      }}
    >
      <View>
        <Text>{props.post.title}</Text>
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
