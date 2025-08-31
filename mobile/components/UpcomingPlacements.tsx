import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const UpcomingPlacements = () => {
  const router = useRouter();
  return (
    <Pressable
      className="mt-6 flex flex-row items-center justify-between bg-white py-4 px-8 rounded-xl"
      onPress={() => {
        router.push("/CompanyDetails");
      }}
    >
      <View>
        <Text className="text-xl font-semibold">Dhee Coding Labs</Text>
        <Text className="text-gray-500">Interns</Text>
      </View>
      <View>
        <Text className="text-xl font-semibold text-green-500">4-12 LPA</Text>
        <Text className="text-gray-500">September 2</Text>
      </View>
    </Pressable>
  );
};

export default UpcomingPlacements;
