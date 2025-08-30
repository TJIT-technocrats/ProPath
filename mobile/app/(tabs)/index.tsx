import { View, Text, ScrollView } from "react-native";
import React from "react";

const index: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-[100vh] flex items-center justify-center">
        <Text className="text-center text-6xl ">Your Future, Our Priority</Text>
      </View>
    </ScrollView>
  );
};

export default index;
