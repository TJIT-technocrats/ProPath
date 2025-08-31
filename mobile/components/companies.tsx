import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Companies = () => {
  const router = useRouter();
  return (
    <Pressable
      className="mt-6 flex flex-col bg-white py-6 px-4 rounded-xl"
      onPress={() => {
        router.push("/CompanyDetails");
      }}
    >
      <View className="flex flex-row  justify-between">
        <View className="flex flex-col">
          <View className="flex flex-row items-center">
            <View className="bg-gray-100 rounded-full p-3 mr-3">
              <MaterialCommunityIcons name="office-building"size={36}color="#4B5563"/>
            </View>
            <View>
              <Text className="text-2xl font-bold">Dhee Coding Labs</Text>
              <Text className="text-gray-600 font-semibold text-lg">
            Interns
          </Text>
            </View>
          </View>
          
        </View>
        <View className="">
          <Text className="text-xl font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-xl">
          Open
        </Text>
        </View>
      </View>

      <View className="flex flex-row items-start justify-between mt-6">
        <View className="flex flex-col">
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold text-green-500 mr-2">
              ₹4-12 LPA
            </Text>
          </View>
          <View className="flex flex-row items-center mt-1">
            <Ionicons name="calendar-outline" size={20} color="gray" />
            <Text className="text-lg font-semibold text-gray-500 ml-2">
              Sept 2, 2025
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
            CGPA: N.A
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Companies;
