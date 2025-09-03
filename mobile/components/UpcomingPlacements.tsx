import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const UpcomingPlacements = () => {
  const router = useRouter();

  return (
    <View>
      <Pressable
        className="mt-4 flex-row items-center justify-between bg-white py-4 px-6 rounded-2xl shadow-lg"
        onPress={() => {
          router.push("/CompanyDetails");
        }}
      >
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center mr-3">
            <MaterialCommunityIcons
              name="briefcase"
              size={28}
              color="#6366f1"
            />
          </View>
          <View className="flex-col justify-center gap-1">
            <Text className="text-xl font-bold text-gray-800">
              Dhee Coding Labs
            </Text>
            <Text className="text-base text-gray-600">Interns</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-1">Bangalore</Text>
            </View>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-xl font-semibold text-green-500 mb-2">
            4-12 LPA
          </Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">Sept 2, 2025</Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-lg">
            <Text className="text-sm font-semibold text-green-600">Open</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default UpcomingPlacements;
