import { View, Text, ScrollView } from "react-native";
import React from "react";
import Companies from "@/components/companies";

const PlacementInfo: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-100">
      <View className="p-3 pt-14 w-full">
        <Companies />
      </View>
    </ScrollView>
  );
};

export default PlacementInfo;
