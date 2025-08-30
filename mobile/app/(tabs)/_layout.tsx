import React from "react";
import { Tabs } from "expo-router";

const NavLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="PlacementInfo" options={{ headerShown: false }} />
      <Tabs.Screen name="Profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default NavLayout;
