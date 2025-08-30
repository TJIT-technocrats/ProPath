import { View, Text, ScrollView } from "react-native";
import React from "react";

const index: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-[100vh] flex items-center justify-center p-0 m-0">
        <View className=" flex items-center justify-center bg-white p-10 w-[90%] rounded-2xl shadow-xl">
            <Text className="text-6xl font-semibold mb-4">Welcome</Text>
            <Text className="text-center">To be a human is to be resilient, to fall and to rise again, carrying the strength of your journey.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
