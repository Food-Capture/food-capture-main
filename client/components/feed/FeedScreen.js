import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Caption, ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";

import API from "../../api";
import FeedPost from "./FeedPost";

const FeedScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get user token
  const token = useSelector((state) => state.auth.token);

  // load new posts
  const loadPosts = async (page) => {
    if (page > totalPages) {
      return;
    }

    const response = await API.get("post", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: page },
    });

    if (response.status == 200) {
      if (page == 1) {
        setPosts(response.data.posts);
      } else {
        setPosts(posts.concat(response.data.posts));
      }
      setCurrentPage(page + 1);
      setTotalPages(response.data.totalPages);
    } else {
      // ERROR
    }
  };

  // refresh to get new posts
  const refresh = async () => {
    setIsRefreshing(true);
    await loadPosts(1);
    setIsRefreshing(false);
  };

  // load latest posts on startup
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await loadPosts(1);
      setIsLoading(false);
    };

    load();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => {
          if (isLoading) {
            return <View></View>;
          }

          return currentPage > totalPages ? (
            <View style={{ alignItems: "center" }}>
              <Caption>No more posts</Caption>
            </View>
          ) : (
            <ActivityIndicator style={{ paddingVertical: 5 }} />
          );
        }}
        keyExtractor={(item, index) => item._id.toString()}
        renderItem={({ item, index }) => {
          return <FeedPost post={item} navigation={props.navigation} />;
        }}
        refreshing={isRefreshing}
        onRefresh={refresh}
        onEndReachedThreshold={0.5}
        onEndReached={loadPosts.bind(this, currentPage)}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, justifyContent: "space-around" },
});
