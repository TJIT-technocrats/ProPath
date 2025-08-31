import { View, Text, ScrollView } from "react-native";
import React from "react";

const CompanyDetails = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="w-full">
        <View className="bg-blue-600 h-[12em] px-4 pl-14 pt-14">
          <View className="mb-2">
            <Text className="text-2xl font-bold text-white">Dhee Coding Labs</Text>
            <Text className="text-gray-200 text-lg">Interns</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold text-white mr-6">
              4-12 LPA
            </Text>
            <Text className=" text-gray-200 text-md">September 2</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CompanyDetails;
