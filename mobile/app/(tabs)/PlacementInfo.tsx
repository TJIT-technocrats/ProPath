import { View, ScrollView } from "react-native";
import React from "react";
import Companies from "@/components/companies";

const PlacementInfo: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="">
      <View className="h-[5.5em] bg-purple-500"></View>
      <View className="w-full h-screen">
        <Companies />
      </View>
    </ScrollView>
  );
};

export default PlacementInfo;
