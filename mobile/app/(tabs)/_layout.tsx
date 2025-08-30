import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const NavLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size = 40 }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="PlacementInfo"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size = 40 }) => (
            <MaterialIcons name="library-books" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size = 40 }) => (
            <Ionicons name="person-circle-sharp" color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
};

export default NavLayout;
