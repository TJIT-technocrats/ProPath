import React from "react";
import { Tabs } from "expo-router";

const NavLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{headerShown:false}} />
    </Tabs>
  );
};

export default NavLayout;
