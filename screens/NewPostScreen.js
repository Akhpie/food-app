import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AddNewPost from "../components/newPost/AddNewPost";

const NewPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#B3ECEC", flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPostScreen;
