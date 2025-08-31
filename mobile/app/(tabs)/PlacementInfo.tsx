import { View, Text, ScrollView } from "react-native";
import React from "react";
import Companies from "@/components/Companies";

const PlacementInfo: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-6 px-4 pt-14 w-full">
        <View className="flex flex-row items-center justify-between mb-6">
          <View className="flex flex-col justify-center">
            <Text className="text-3xl font-bold ">Placement Drive</Text>
            <Text className="text-lg shadow-black">5 companies visiting</Text>
          </View>
        </View>
        <Companies />
      </View>
    </ScrollView>
  );
};

export default PlacementInfo;
