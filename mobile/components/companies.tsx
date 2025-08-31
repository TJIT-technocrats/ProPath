import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const companies = () => {
  const router = useRouter();
  return (
    <Pressable
      className="mt-6 flex flex-col bg-white py-4 px-6 rounded-xl"
      onPress={() => {
        router.push("/");
      }}
    >
      <View className="flex flex-row items-start justify-between">
        <View className="flex flex-col">
          <View className="flex flex-row items-center">
            <View className="bg-gray-100 rounded-full p-3 mr-3">
              <MaterialCommunityIcons name="office-building"size={36}color="#4B5563"/>
            </View>
            <Text className="text-[2rem] font-semibold">Google</Text>
          </View>
          <Text className="text-black font-semibold text-xl mt-3">
            Software Engineer
          </Text>
        </View>
        <Text className="text-xl font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-xl">
          Open
        </Text>
      </View>

      <View className="flex flex-row items-start justify-between mt-6">
        <View className="flex flex-col">
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold text-green-500 mr-2">
              ₹25 LPA
            </Text>
          </View>
          <View className="flex flex-row items-center mt-1">
            <Ionicons name="calendar-outline" size={20} color="gray" />
            <Text className="text-lg font-semibold text-gray-500 ml-2">
              March 15, 2024
            </Text>
          </View>
        </View>

        <View className="flex flex-col items-end">
          <View className="flex flex-row items-center">
            <Ionicons name="location-outline" size={20} color="gray" />
            <Text className="text-lg font-semibold text-gray-500 ml-2">
              Bangalore
            </Text>
          </View>
          <Text className="text-lg font-semibold text-gray-500 mt-1">
            CGPA: 7.5+ CGPA
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default companies;
