import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SignupForm from "../signupScreen/SignupForm";

const SignUpScreen = ({ navigation }) => {
  return (
    <>
      <SignupForm navigation={navigation} />
    </>
  );
};

export default SignUpScreen;
