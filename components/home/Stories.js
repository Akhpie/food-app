import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { USERS } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13, marginTop: 12 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View
            key={index}
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: "white", textAlign: "center" }}>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + "..."
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 14,
    borderWidth: 3,
    borderColor: "#3BD6C6",
  },
});

export default Stories;
