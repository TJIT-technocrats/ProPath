import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const CompanyDetails = () => {
  const router = useRouter();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-gray-100 flex-1"
    >
      {/* Header Section */}
      <Animated.View
        entering={FadeInUp.duration(600)}
        className="bg-blue-600 pt-10 pb-6 rounded-b-[30px] shadow-md"
      >
        <View className="flex-row items-center px-5 mb-5">
          <TouchableOpacity className="p-1" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold ml-3">
            Company Details
          </Text>
        </View>

        <View className="flex-row items-center px-5 mb-3">
          <View className="w-16 h-16 rounded-2xl bg-white mr-4 items-center justify-center">
            <MaterialCommunityIcons
              name="office-building"
              size={36}
              color="#4B5563"
            />
          </View>
          <View>
            <Text className="text-2xl font-bold text-white">
              Dhee Coding Labs
            </Text>
            <Text className="text-base text-white opacity-80">Internship</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-2 px-7">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="currency-inr"
              size={16}
              color="white"
            />
            <Text className="text-base text-white ml-1">₹4-6 LPA (Stipend)</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="white" />
            <Text className="text-base text-white ml-1">Bangalore</Text>
          </View>
        </View>
      </Animated.View>

      {/* Details Card */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(600)}
        className="bg-white rounded-2xl mx-5 p-5 shadow-md mt-5 mb-5"
      >
        <View className="flex-row justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-2">
              <Ionicons name="calendar-outline" size={24} color="#7b68ee" />
            </View>
            <View>
              <Text className="text-xs text-gray-500">Interview Date</Text>
              <Text className="text-base font-bold text-gray-800">
                Sept 2, 2025
              </Text>
            </View>
          </View>
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-2">
              <Ionicons name="time-outline" size={24} color="#7b68ee" />
            </View>
            <View>
              <Text className="text-xs text-gray-500">CGPA Required</Text>
              <Text className="text-base font-bold text-gray-800">7.5+</Text>
            </View>
          </View>
        </View>
        <View className="h-[1px] bg-gray-200 my-3" />
        <View className="flex-row justify-between">
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-2">
              <Ionicons name="person-outline" size={24} color="#7b68ee" />
            </View>
            <View>
              <Text className="text-xs text-gray-500">Experience</Text>
              <Text className="text-base font-bold text-gray-800">
                Internship
              </Text>
            </View>
          </View>
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-2">
              <Ionicons name="briefcase-outline" size={24} color="#7b68ee" />
            </View>
            <View>
              <Text className="text-xs text-gray-500">Type</Text>
              <Text className="text-base font-bold text-gray-800">
                Full-time
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* About Company */}
      <Animated.View
        entering={FadeInUp.delay(300).duration(600)}
        className="bg-white rounded-2xl mx-5 p-5 shadow-md mb-5"
      >
        <Text className="text-lg font-bold mb-3">About Company</Text>
        <Text className="text-sm text-gray-700 leading-relaxed">
          Dhee Coding Labs is a technology-driven organization focusing on Data
          Science, AI, and Fullstack Web Development. We aim to provide students
          with real-world exposure by working on industry-level projects while
          enhancing their technical and problem-solving skills.
        </Text>
      </Animated.View>

      {/* Eligibility Criteria */}
      <Animated.View
        entering={FadeInUp.delay(400).duration(600)}
        className="bg-white rounded-2xl mx-5 p-5 shadow-md mb-5"
      >
        <Text className="text-lg font-bold mb-3">Eligibility Criteria</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">CGPA Requirement</Text>
          <Text className="font-semibold text-gray-800">7.5+</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Eligible Branches</Text>
          <Text className="font-semibold text-gray-800">CSE, IT, ECE</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Backlogs</Text>
          <Text className="font-semibold text-gray-800">
            No active backlogs
          </Text>
        </View>
      </Animated.View>

      {/* Job Description */}
      <Animated.View
        entering={FadeInUp.delay(500).duration(600)}
        className="bg-white rounded-2xl mx-5 p-5 shadow-md mb-5"
      >
        <Text className="text-lg font-bold mb-3">Job Description</Text>
        <Text className="text-gray-700 mb-1">
          • Assist in developing and maintaining web applications using modern
          frameworks
        </Text>
        <Text className="text-gray-700 mb-1">
          • Support data science projects by cleaning, processing, and analyzing
          datasets
        </Text>
        <Text className="text-gray-700 mb-1">
          • Collaborate with mentors and cross-functional teams to implement new
          features
        </Text>
        <Text className="text-gray-700 mb-1">
          • Document code and contribute to project reports
        </Text>
        <Text className="text-gray-700">
          • Gain hands-on experience in software development best practices
        </Text>
      </Animated.View>

      {/* Requirements */}
      <Animated.View
        entering={FadeInUp.delay(600).duration(600)}
        className="bg-white rounded-2xl mx-5 p-5 shadow-md mb-5"
      >
        <Text className="text-lg font-bold mb-3">Requirements</Text>
        <Text className="text-gray-700 mb-1">
          • Strong understanding of Fullstack development (MERN/Next.js)
        </Text>
        <Text className="text-gray-700 mb-1">
          • Knowledge of Data Science with Python (Pandas, NumPy, Scikit-learn)
        </Text>
        <Text className="text-gray-700 mb-1">
          • Basic familiarity with cloud platforms (AWS/GCP/Azure preferred)
        </Text>
        <Text className="text-gray-700 mb-1">
          • Good problem-solving and analytical thinking
        </Text>
        <Text className="text-gray-700">
          • Eagerness to learn and contribute in a team environment
        </Text>
      </Animated.View>

      {/* Selection Process */}
      <Animated.View
        entering={FadeInUp.delay(700).duration(600)}
        className="bg-white rounded-2xl mx-5 p-5 shadow-md mb-20"
      >
        <Text className="text-lg font-bold mb-3">Selection Process</Text>
        <Text className="text-gray-700 mb-1">1. Online Application</Text>
        <Text className="text-gray-700 mb-1">2. Online Test</Text>
        <Text className="text-gray-700 mb-1">
          3. Technical Interview (1–2 rounds)
        </Text>
        <Text className="text-gray-700 mb-1">4. HR Interview</Text>
        <Text className="text-gray-700 mb-5">5. Final Selection</Text>

        {/* Apply Button */}
        <TouchableOpacity
          onPress={() => router.push("/Test")}
          className="bg-blue-600 rounded-2xl py-3 items-center"
        >
          <Text className="text-white font-semibold text-lg">
            Apply for this Position
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default CompanyDetails;
