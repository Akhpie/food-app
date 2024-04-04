import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const handleSignout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("signed out");
  } catch (error) {
    console.log(error);
  }
};

export const bottomTabIcons = [
  {
    name: "Home",
    inactive: "https://img.icons8.com/ios/3BD6C6/home--v1.png",
    active: "https://img.icons8.com/ios-filled/3BD6C6/home--v1.png",
  },
  {
    name: "Search",
    inactive: "https://img.icons8.com/ios/3BD6C6/search--v1.png",
    active: "https://img.icons8.com/ios-filled/3BD6C6/search--v1.png",
  },
  {
    name: "Reels",
    inactive: "https://img.icons8.com/ios/3BD6C6/instagram-reel.png",
    active: "https://img.icons8.com/ios-filled/3BD6C6/instagram-reel.png",
  },
  {
    name: "Shop",
    inactive: "https://img.icons8.com/ios/3BD6C6/shop--v1.png",
    active: "https://img.icons8.com/ios-filled/3BD6C6/shop--v1.png",
  },
  {
    name: "Profile",
    inactive:
      "https://st.depositphotos.com/1518767/4293/i/450/depositphotos_42930411-stock-photo-concentrated-male-chef-garnishing-food.jpg",
    active:
      "https://st.depositphotos.com/1518767/4293/i/450/depositphotos_42930411-stock-photo-concentrated-male-chef-garnishing-food.jpg",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showLogout, setShowLogout] = useState(false);

  const Icon = ({ icon }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(icon.name)}
      onLongPress={() => {
        if (icon.name === "Profile") {
          setShowLogout(true);
        }
      }}
      onPressOut={() => {
        if (icon.name === "Profile") {
          setShowLogout(false);
        }
      }}
    >
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
      {showLogout && icon.name === "Profile" && (
        <TouchableOpacity onPress={handleSignout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: "#1a1919",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },

  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderColor: "#BE29EC",
    borderWidth: activeTab === "Profile" ? 2 : 0,
  }),
  logoutButton: {
    position: "absolute",
    top: -45,
    right: 2,
    backgroundColor: "#BE29EC",
    padding: 5,
    borderRadius: 5,
    width: 100,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default BottomTabs;
