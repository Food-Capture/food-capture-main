import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  Provider as PaperProvider,
  DefaultTheme,
  useTheme,
} from "react-native-paper";

const FeedPost = (props) => {
  const { colors, fonts } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        props.navigation.navigate("Details", props.post);
      }}
    >
      <View>
        <Card
          elevation={5} // TODO: elevation not working on android (not sure iOS)
          style={[{ backgroundColor: colors.primary }]}
        >
          <Card.Content>
            <Title
              style={[styles.title, { fontFamily: fonts.regular.fontFamily }]}
            >
              {props.post.title}
            </Title>
          </Card.Content>

          {props.post.image && props.post.image.url && (
            <Card.Cover
              source={{ uri: props.post.image.url }}
              style={{ height: 200 }}
            />
          )}

          <Card.Content>
            {/* <Title style={styles.title}>{props.post.title}</Title> */}
            <Text style={styles.field}>
              <Text style={styles.fieldName}>Location: </Text>{" "}
              {props.post.location}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldName}>Collect by: </Text>{" "}
              {new Date(props.post.collectBy).toLocaleString()}
            </Text>
          </Card.Content>
        </Card>
      </View>
      {/* </PaperProvider> */}
    </TouchableOpacity>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    marginTop: 5,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },
  fieldName: { fontWeight: "bold" },
  field: { marginTop: 10, fontSize: 13, color: "#ffffff" },
});
