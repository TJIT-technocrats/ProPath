import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const UpcomingPlacements = () => {
  const router = useRouter();
  return (
    <Pressable
      className="mt-6 flex flex-row items-center justify-between bg-white py-4 px-8 rounded-xl"
      onPress={() => {
        router.push("/CompanyDetails");
      }}
    >
      <View className="flex flex-col justify-center gap-1">
        <Text className="text-xl font-semibold">Dhee Coding Labs</Text>
        <Text className="text-gray-500">Interns</Text>
      </View>
      <View className="items-end">
        <Text className="text-xl font-semibold text-green-500 mb-1">4-12 LPA</Text>
        <View className="flex flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="gray" />
          <Text className="text-gray-500 ml-1">Sept 2</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UpcomingPlacements;
