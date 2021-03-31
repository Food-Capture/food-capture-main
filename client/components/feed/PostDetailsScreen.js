import React from "react";
import { StyleSheet, Text, ScrollView, Image } from "react-native";

const PostDetailsScreen = (props) => {
  const {
    title,
    location,
    collectBy,
    allergens,
    containsMeat,
    description,
    image,
  } = props.route.params;
  console.log(image);
  return (
    <ScrollView style={styles.screen}>
      <Text>{title}</Text>
      {image && image.url && (
        <Image source={{ uri: image.url }} style={{ height: 300 }} />
      )}
      <Text>Location: {location}</Text>
      <Text>Collect By: {new Date(collectBy).toLocaleString()}</Text>
      <Text>Allergens: {allergens}</Text>
      <Text>containsMeat: {containsMeat ? "Y" : "N"}</Text>
      <Text>Description: {description}</Text>
    </ScrollView>
  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
});
