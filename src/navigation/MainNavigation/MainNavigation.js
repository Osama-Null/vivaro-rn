import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { deleteToken } from "../../api/storage";
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.68)",
        tabBarStyle: {
          height: 50,
          backgroundColor: "#282A36",
          borderColor: "#282A36",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          // justifyContent: "center",
          // alignContent: "center",
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignContent: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNav"
        component={AuthNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={27} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigation;

const styles = StyleSheet.create({});
