import { View } from "react-native";
import React from "react";
import Companies from "@/components/companies";

const PlacementInfo: React.FC = () => {
  return (
    <>
      <View className="h-[5.5em] bg-purple-500"></View>
      <View className="w-full h-screen">
        <Companies />
      </View>
    </>
  );
};

export default PlacementInfo;
