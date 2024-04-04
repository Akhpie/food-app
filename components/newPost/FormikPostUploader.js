import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import firebase from "firebase/compat/app";
import ImagePicker from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const PLACEHOLDER_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getUsername = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());

    return unsubscribe;
  };

  return (
    // <Formik
    //   initialValues={{ caption: "", imageUrl: "" }}
    //   onSubmit={(values) => {
    //     uploadPostToFirebase(values.imageUrl, values.caption);
    //   }}
    //   validationSchema={uploadPostSchema}
    //   validateOnMount={true}
    // >
    //   {({
    //     handleBlur,
    //     handleChange,
    //     handleSubmit,
    //     values,
    //     errors,
    //     isValid,
    //   }) => (
    //     <>
    //       <View
    //         style={{
    //           margin: 20,
    //           justifyContent: "space-between",
    //           flexDirection: "row",
    //         }}
    //       >
    //         <Image
    //           source={{
    //             uri: validUrl.isUri(thumbnailUrl)
    //               ? thumbnailUrl
    //               : PLACEHOLDER_IMG,
    //           }}
    //           style={{ width: 100, height: 100 }}
    //         />
    //         <View style={{ flex: 1, marginLeft: 12 }}>
    //           <TextInput
    //             style={{ color: "white", fontSize: 20 }}
    //             placeholder="Write a caption..."
    //             placeholderTextColor="gray"
    //             multiline={true}
    //             onChangeText={handleChange("caption")}
    //             onBlur={handleBlur("caption")}
    //             value={values.caption}
    //           />
    //         </View>
    //       </View>
    //       <Divider width={0.2} orientation="vertical" />
    //       <TextInput
    //         onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
    //         style={{ color: "white", fontSize: 18, marginTop: 10 }}
    //         placeholder="Enter Image Url"
    //         placeholderTextColor="gray"
    //         onChangeText={handleChange("imageUrl")}
    //         onBlur={handleBlur("imageUrl")}
    //         value={values.imageUrl}
    //       />
    //       {errors.imageUrl && (
    //         <Text style={{ fontSize: 10, color: "red" }}>
    //           {errors.imageUrl}
    //         </Text>
    //       )}
    //       <View style={styles.container}>
    //         <Pressable style={styles.Sharebutton}>
    //           <Text
    //             onPress={handleSubmit}
    //             disabled={!isValid}
    //             style={{ color: "white" }}
    //           >
    //             Share
    //           </Text>
    //         </Pressable>
    //       </View>
    //     </>
    //   )}
    // </Formik>
    <View style={{ paddingHorizontal: 2, paddingTop: 60 }}>
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 20,
          padding: 30,
          shadowColor: "#6C63FF",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <Formik
          initialValues={{ caption: "", imageUrl: "" }}
          onSubmit={(values) => {
            uploadPostToFirebase(values.imageUrl, values.caption);
          }}
          validationSchema={uploadPostSchema}
          validateOnMount={true}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: thumbnailUrl || PLACEHOLDER_IMG,
                  }}
                  style={{ width: 120, height: 120, borderRadius: 12 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    fontSize: 16,
                    color: "#000",
                    borderBottomWidth: 1,
                    borderBottomColor: "#6C63FF",
                  }}
                  placeholder="Write a caption..."
                  placeholderTextColor="#A09CA4"
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
              {errors.caption && (
                <Text style={{ fontSize: 12, color: "#FF5C5C", marginTop: 4 }}>
                  {errors.caption}
                </Text>
              )}
              <View>
                <TextInput
                  onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                  style={{
                    fontSize: 16,
                    color: "#000",
                    borderBottomWidth: 1,
                    borderBottomColor: "#6C63FF",
                  }}
                  placeholder="Enter Image Url"
                  placeholderTextColor="#A09CA4"
                  onChangeText={handleChange("imageUrl")}
                  onBlur={handleBlur("imageUrl")}
                  value={values.imageUrl}
                />
                {errors.imageUrl && (
                  <Text
                    style={{ fontSize: 12, color: "#FF5C5C", marginTop: 4 }}
                  >
                    {errors.imageUrl}
                  </Text>
                )}
              </View>
              <Pressable
                style={{
                  backgroundColor: isValid ? "#6C63FF" : "#A09CA4",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  borderRadius: 25,
                  marginTop: 40,
                }}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>Share</Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Sharebutton: {
    backgroundColor: "#BE29EC",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  container: {
    flex: 1,
    paddingHorizontal: 90,
  },
});

export default FormikPostUploader;
