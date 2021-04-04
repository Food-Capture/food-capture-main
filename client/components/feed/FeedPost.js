import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const FeedPost = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details", props.post);
      }}
    >
      <View>
      <Card>
        <Card.Content>
        <Title style={styles.title}>{props.post.title}</Title>
        </Card.Content>

        {props.post.image && props.post.image.url && (
          <Card.Cover source={{ uri: props.post.image.url }} style={{ height: 200 }}/>
        )}


        <Card.Content>
        {/* <Title style={styles.title}>{props.post.title}</Title> */}
        <Text style={styles.field}><Text style={styles.fieldName}>Location:</Text> {props.post.location}</Text>
        <Text style={styles.field}><Text style={styles.fieldName}>Collected by:</Text> {new Date(props.post.collectBy).toLocaleString()}</Text>
        </Card.Content>
      </Card>
      </View>
    </TouchableOpacity>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  title: { flex: 1, marginTop: 10, marginBottom:10, fontFamily:  "Verdana", fontWeight: "bold", fontSize: 20},
  fieldName: { fontWeight: "bold"},
  field: {marginTop: 10, fontSize: 15, fontFamily:  "Verdana"}
});