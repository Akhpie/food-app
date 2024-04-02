import { View, Text, Image } from "react-native";
import React from "react";
import LoginForm from "../loginScreen/LoginForm";

const LoginScreen = ({ navigation }) => {
  return (
    <>
      <LoginForm navigation={navigation} />
    </>
  );
};

export default LoginScreen;
