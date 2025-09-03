import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TestPage = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

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
          <Text className="text-xl font-bold text-white">
            Qualification Test
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View className="px-6">
          <Text className="text-2xl font-bold text-white">
            Dhee Coding Labs
          </Text>
          <Text className="text-lg text-white opacity-90 mb-4">
            Internship Test
          </Text>
          <View className="flex-row items-center bg-white/20 px-4 py-2 rounded-lg">
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color="white"
            />
            <Text className="text-base text-white font-semibold ml-2">
              Available until Sept 4, 2025
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mt-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          About the Test
        </Text>
        <Text className="text-base text-gray-700 leading-relaxed">
          This qualification test is designed to evaluate your skills in
          Fullstack Development, Data Science with Python, and Problem-Solving.
          Passing this test is mandatory to advance in the recruitment process
          for the internship at Dhee Coding Labs.
        </Text>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Test Details
        </Text>
        <View className="flex-row items-center mb-3">
          <View className="bg-purple-100 p-2 rounded-lg mr-3">
            <Ionicons name="time-outline" size={24} color="#7B68EE" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">Duration</Text>
            <Text className="text-base font-semibold text-gray-800">
              60 minutes
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mb-3">
          <View className="bg-purple-100 p-2 rounded-lg mr-3">
            <Ionicons name="list-outline" size={24} color="#7B68EE" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">Sections</Text>
            <Text className="text-base font-semibold text-gray-800">
              Coding + MCQs
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mb-3">
          <View className="bg-purple-100 p-2 rounded-lg mr-3">
            <Ionicons name="book-outline" size={24} color="#7B68EE" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">Topics</Text>
            <Text className="text-base font-semibold text-gray-800">
              Fullstack Basics, Python (Data Science), Problem Solving
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="bg-purple-100 p-2 rounded-lg mr-3">
            <Ionicons name="laptop-outline" size={24} color="#7B68EE" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">Mode</Text>
            <Text className="text-base font-semibold text-gray-800">
              Online (attempt from your system)
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-2xl mx-5 p-6 mb-20 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Instructions
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          1. Ensure a stable internet connection
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          2. Use a laptop/desktop for coding sections
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          3. Do not close the app during the test
        </Text>
        <Text className="text-base text-gray-700 mb-6">
          4. You can attempt the test only once
        </Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-blue-600 rounded-xl py-4 items-center shadow-md"
        >
          <Text className="text-white text-lg font-semibold">Start Test</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl mx-5">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Start Qualification Test
            </Text>
            <Text className="text-base text-gray-700 mb-4">
              Are you ready to start the test? Ensure you have 60 minutes, a
              stable internet connection, and a suitable device. You can only
              attempt this test once.
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-1 bg-blue-600 p-3 rounded-xl mr-2"
                onPress={() => {
                  setModalVisible(false);
                  alert("Test Started!");
                }}
              >
                <Text className="text-white text-center font-semibold">
                  Start Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-xl ml-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-800 text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TestPage;
