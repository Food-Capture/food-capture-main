import React from "react";
import { StyleSheet, Text, ScrollView, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


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
      <Card>
      <Title style={styles.title}><Text>{title}</Text></Title>
      {image && image.url && (
        <Image source={{ uri: image.url }} style={{ height: 300 }} />
      )}
      <Card.Content style={styles.content}>
        <Text style={styles.field}>Location: {location}</Text>
        <Text style={styles.field}>Collect By: {new Date(collectBy).toLocaleString()}</Text>
        <Text style={styles.field}>Allergens: {allergens}</Text>
        <Text style={styles.field}>containsMeat: {containsMeat ? "Y" : "N"}</Text>
        <Text style={styles.field}>Description: {description}</Text>
      </Card.Content>
      
      </Card>
    </ScrollView>
  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  title: { flex: 1, marginTop: 20, marginBottom:20, textAlign: "center", fontFamily:  "Verdana", fontWeight: "bold", fontSize: 25},
  field: {marginTop: 20, fontSize: 18, fontFamily:  "Verdana"},
  content: { marginTop: 20}
});