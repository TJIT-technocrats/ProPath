import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CompanyDetails = () => {
  const router = useRouter();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-gray-100 flex-1"
    >
      <View className="bg-blue-600 pt-12 pb-8 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between px-6 mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Company Details</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center px-6 mb-4">
          <View className="w-16 h-16 rounded-xl bg-white items-center justify-center mr-4 shadow-md">
            <MaterialCommunityIcons
              name="office-building"
              size={36}
              color="#4B5563"
            />
          </View>
          <View>
            <Text className="text-3xl font-bold text-white">
              Dhee Coding Labs
            </Text>
            <Text className="text-lg text-white opacity-90">Internship</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center px-6">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="currency-inr"
              size={20}
              color="white"
            />
            <Text className="text-lg font-semibold text-white ml-2">
              ₹4-6 LPA (Stipend)
            </Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-lg">
            <Text className="text-sm font-semibold text-green-600">Open</Text>
          </View>
        </View>
        <View className="flex-row justify-between px-6 mt-2">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="white" />
            <Text className="text-lg font-semibold text-white ml-2">
              Bangalore
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color="white" />
            <Text className="text-lg font-semibold text-white ml-2">
              Sept 2, 2025
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mt-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Key Details
        </Text>
        <View className="flex-row justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-3">
              <Ionicons name="calendar-outline" size={24} color="#7B68EE" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Interview Date</Text>
              <Text className="text-base font-semibold text-gray-800">
                Sept 2, 2025
              </Text>
            </View>
          </View>
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-3">
              <Ionicons name="school-outline" size={24} color="#7B68EE" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">CGPA Required</Text>
              <Text className="text-base font-semibold text-gray-800">
                7.5+
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-3">
              <Ionicons name="person-outline" size={24} color="#7B68EE" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Experience</Text>
              <Text className="text-base font-semibold text-gray-800">
                Internship
              </Text>
            </View>
          </View>
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-100 p-2 rounded-lg mr-3">
              <Ionicons name="briefcase-outline" size={24} color="#7B68EE" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Type</Text>
              <Text className="text-base font-semibold text-gray-800">
                Full-time
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          About Company
        </Text>
        <Text className="text-base text-gray-700 leading-relaxed">
          Dhee Coding Labs is a technology-driven organization specializing in
          Data Science, AI, and Fullstack Web Development. We empower students
          with hands-on experience through industry-level projects, fostering
          technical expertise and problem-solving skills in a collaborative
          environment.
        </Text>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Eligibility Criteria
        </Text>
        <View className="flex-row justify-between mb-3">
          <Text className="text-base text-gray-500">CGPA Requirement</Text>
          <Text className="text-base font-semibold text-gray-800">7.5+</Text>
        </View>
        <View className="flex-row justify-between mb-3">
          <Text className="text-base text-gray-500">Eligible Branches</Text>
          <Text className="text-base font-semibold text-gray-800">
            CSE, IT, ECE
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-base text-gray-500">Backlogs</Text>
          <Text className="text-base font-semibold text-gray-800">
            No active backlogs
          </Text>
        </View>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Job Description
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Develop and maintain web applications using modern frameworks like
          MERN or Next.js
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Support data science projects by cleaning, processing, and analyzing
          large datasets
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Collaborate with mentors and cross-functional teams to implement
          innovative features
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Document code and contribute to comprehensive project reports
        </Text>
        <Text className="text-base text-gray-700">
          • Gain hands-on experience in software development best practices
        </Text>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Requirements
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Strong proficiency in Fullstack development (MERN/Next.js)
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Knowledge of Data Science with Python (Pandas, NumPy, Scikit-learn)
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Familiarity with cloud platforms (AWS, GCP, or Azure preferred)
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          • Strong problem-solving and analytical skills
        </Text>
        <Text className="text-base text-gray-700">
          • Eagerness to learn and thrive in a team environment
        </Text>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-20 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Selection Process
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          1. Online Application
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          2. Online Coding Test
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          3. Technical Interview (1–2 rounds)
        </Text>
        <Text className="text-base text-gray-700 mb-2">4. HR Interview</Text>
        <Text className="text-base text-gray-700 mb-6">5. Final Selection</Text>

        <TouchableOpacity
          onPress={() => router.push("/Test")}
          className="bg-blue-600 rounded-xl py-4 items-center shadow-md"
        >
          <Text className="text-white text-lg font-semibold">
            Apply for this Position
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CompanyDetails;
