import { View, Text, ScrollView } from "react-native";
import React from "react";

const CompanyDetails = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-[100vh] flex items-center justify-center">
        <Text className="text-3xl">Company Details</Text>
      </View>
    </ScrollView>
  );
};

export default CompanyDetails;
