// import React from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import FormikPostUploader from "./FormikPostUploader";

// const AddNewPost = ({ navigation }) => (
//   <View>
//     <Header navigation={navigation} />
//     <FormikPostUploader />
//   </View>
// );

// const Header = ({ navigation }) => (
//   <View style={styles.headerContainer}>
//     <TouchableOpacity onPress={() => navigation.goBack()}>
//       <Image
//         source={{
//           uri: "https://img.icons8.com/ios/43E8D8/circled-left-2.png",
//         }}
//         style={{ width: 30, height: 30 }}
//       />
//     </TouchableOpacity>
//     <Text style={styles.headerText}>NEW POST</Text>
//     <Text></Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 10,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 20,
//     marginRight: 23,
//   },
// });
// export default AddNewPost;

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <FormikPostUploader navigation={navigation} />
  </View>
);

const Header = ({ navigation }) => (
  <View style={[styles.headerContainer, styles.shadow]}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios/43E8D8/circled-left-2.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  headerText: {
    color: "#2f2f2f",
    fontWeight: "700",
    fontSize: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AddNewPost;
