import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Pressable,
  Alert,
} from "react-native";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
// import firebase from "../firebase.js";
import firebase from "../firebase";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const MYAPP_LOGO = require("../assets/food-app-title.png");
const MYAPPLOGO_LINK =
  "https://see.fontimg.com/api/renderfont4/9YVZK/eyJyIjoiZnMiLCJoIjo3NiwidyI6MTAwMCwiZnMiOjc2LCJmZ2MiOiIjQ0QzN0UwIiwiYmdjIjoiIzM1M0Q0QiIsInQiOjF9/VHJ1Zmxl/autumn-flowers.png";

const LoginForm = ({ navigation }) => {
  const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
      iterations: -1,
      easing: Easing.easeInOut,
      isInteraction: true,
    }).start();
  }, []);

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase login successful", email, password);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const backgroundInterpolation = backgroundColor.interpolate({
    inputRange: [0, 2],
    outputRange: ["#43E8D8", "#D896FF"],
  });

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have atleast 8 characters"),
  });

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: backgroundInterpolation }]}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: MYAPPLOGO_LINK }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Username or Email"
                  placeholderTextColor="#888"
                  autoFocus={true}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Pressable
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.loginButtonText}>Log In</Text>
                </Pressable>
                <View>
                  <Text style={styles.signupText}>
                    Don't have an account?{" "}
                    <TouchableOpacity>
                      <Text
                        style={styles.signupLink}
                        onPress={() => navigation.push("SignupScreen")}
                      >
                        Sign up
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#BE29EC" : "#D896FF",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  }),
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 100,
  },
  formContainer: {
    marginTop: 30,
  },
  input: {
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#BE29EC",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  signupLink: {
    color: "#BE29EC",
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: -10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#888",
  },
});

export default LoginForm;
