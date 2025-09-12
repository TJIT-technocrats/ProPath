import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const NavLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#6366f1", // Indigo
        tabBarInactiveTintColor: "#9CA3AF", // Gray
        tabBarStyle: {
          paddingBottom: 3,
          paddingTop: 5,
          height: 55,
          width: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="home" color={color} size={31} />
          ),
        }}
      />
      <Tabs.Screen
        name="PlacementInfo"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="library-books" color={color} size={31} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="user" color={color} size={31} />
          ),
        }}
      />
    </Tabs>
  );
};

export default NavLayout;
