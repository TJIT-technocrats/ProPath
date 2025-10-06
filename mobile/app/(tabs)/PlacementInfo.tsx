import { View } from "react-native";
import React from "react";
import Companies from "@/components/companies";

const PlacementInfo: React.FC = () => {
  return (
    <>
      <View className="h-[3.5em] bg-white"></View>
      <View className="w-full h-screen">
        <Companies />
      </View>
    </>
  );
};

export default PlacementInfo;
