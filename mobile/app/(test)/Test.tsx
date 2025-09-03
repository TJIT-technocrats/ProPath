import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const TestPage = () => {
  const router = useRouter();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-gray-100 flex-1"
    >
      {/* Header */}
      <Animated.View
        entering={FadeInUp.duration(600)}
        className="bg-blue-600 pt-10 pb-6 rounded-b-[30px] shadow-md"
      >
        <View className="flex-row items-center px-5 mb-5">
          <TouchableOpacity className="p-1" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold ml-3">
            Qualification Test
          </Text>
        </View>
      </Animated.View>

      {/* Info Section */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(600)}
        className="bg-white rounded-2xl mx-5 p-6 shadow-md mt-6 mb-5"
      >
        <Text className="text-lg font-bold mb-3 text-gray-800">
          To apply for this position, you must take a test.
        </Text>
        <Text className="text-sm text-gray-700 leading-relaxed">
          This test will evaluate your skills in Fullstack Development,
          Data Science with Python, and Problem-Solving. 
          Passing this test is mandatory to move forward in the 
          recruitment process.
        </Text>
      </Animated.View>

      {/* Test Details */}
      <Animated.View
        entering={FadeInUp.delay(400).duration(600)}
        className="bg-white rounded-2xl mx-5 p-6 shadow-md mb-5"
      >
        <Text className="text-lg font-bold mb-3 text-gray-800">
          Test Details
        </Text>
        <Text className="text-gray-700 mb-2">• Duration: 60 minutes</Text>
        <Text className="text-gray-700 mb-2">• Sections: Coding + MCQs</Text>
        <Text className="text-gray-700 mb-2">
          • Topics: Fullstack basics, Python (Data Science), Problem Solving
        </Text>
        <Text className="text-gray-700">
          • Mode: Online (attempt from your system)
        </Text>
      </Animated.View>

      {/* Instructions */}
      <Animated.View
        entering={FadeInUp.delay(600).duration(600)}
        className="bg-white rounded-2xl mx-5 p-6 shadow-md mb-20"
      >
        <Text className="text-lg font-bold mb-3 text-gray-800">
          Instructions
        </Text>
        <Text className="text-gray-700 mb-2">1. Ensure a stable internet connection</Text>
        <Text className="text-gray-700 mb-2">2. Use a laptop/desktop for coding</Text>
        <Text className="text-gray-700 mb-2">3. Do not close the app during the test</Text>
        <Text className="text-gray-700 mb-5">4. You can attempt the test only once</Text>

        {/* Start Test Button */}
        <TouchableOpacity
          onPress={() => alert("Test Started!")}
          className="bg-blue-600 rounded-2xl py-3 items-center"
        >
          <Text className="text-white font-semibold text-lg">Start Test</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default TestPage;
