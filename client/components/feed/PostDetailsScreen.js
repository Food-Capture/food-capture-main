import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

const PostDetailsScreen = (props) => {
  const {
    title,
    location,
    collectBy,
    allergens,
    containsMeat,
    description,
  } = props.route.params;
  return (
    <ScrollView style={styles.screen}>
      <Text>{title}</Text>
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
