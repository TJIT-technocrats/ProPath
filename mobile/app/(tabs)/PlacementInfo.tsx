import { View, Text, ScrollView, Pressable } from "react-native";
import Companies from "@/components/companies";
import React from "react";

const PlacementInfo: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-6 px-4 pt-14 w-full">
        <View className="flex flex-row items-center justify-between mb-6">
          <View className="flex flex-col justify-center">
            <Text className="text-3xl font-semibold ">Placement Drive</Text>
            <Text className="text-lg shadow-black">5 companies visiting</Text>
          </View>
        </View>
        <Companies />
      </View>
    </ScrollView>
  );
};

export default PlacementInfo;
