import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

const Profile: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-6 px-4 pt-14 w-full" showsVerticalScrollIndicator={false} >
      {/* User Profile Section */}
      <View className="items-center mb-5 mt-5">
        <View className="w-24 h-24 rounded-full bg-blue-500 justify-center items-center mb-3">
          <AntDesign name="user" size={60} color="white" />
        </View>
        <Text className="text-xl font-bold text-gray-800">Yugitha B</Text>
        <Text className="text-base text-gray-600 mb-4">Computer Science Engineering</Text>

        <View className="flex-row justify-between w-full ">
          <View className="bg-white rounded-lg p-6 items-center flex-1 mx-1 shadow">
            <Text className="text-xl font-bold">8.0</Text>
            <Text className="text-xs text-gray-500">CGPA</Text>
          </View>
          <View className="bg-white rounded-lg p-6 items-center flex-1 mx-1 shadow">
            <Text className="text-xl font-bold">4th Year</Text>
            <Text className="text-xs text-gray-500">Current Year</Text>
          </View>
          <View className="bg-white rounded-lg p-6 items-center flex-1 mx-1 shadow">
            <Text className="text-xl font-bold">12</Text>
            <Text className="text-xs text-gray-500">Applications</Text>
          </View>
        </View>
      </View>

      {/* Contact Information Section */}
      <View className="bg-white p-4 rounded-lg mb-5 shadow">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800">Contact Information</Text>
          <TouchableOpacity>
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mb-2">
          <AntDesign name="mail" size={20} color="black" />
          <Text className="ml-3 text-base text-gray-700">yugithabalaji@college.edu</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <AntDesign name="phone" size={20} color="black" />
          <Text className="ml-3 text-base text-gray-700">+91 9876543210</Text>
        </View>
        <View className="flex-row items-center">
          <AntDesign name="idcard" size={20} color="black" />
          <Text className="ml-3 text-base text-gray-700">CSE/2021/001</Text>
        </View>
      </View>

      {/* Skills Section */}
      <View className="bg-white p-4 rounded-lg mb-5 shadow">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Skills</Text>
        <View className="flex-row flex-wrap">
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2">JavaScript</Text>
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2">React</Text>
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2">Node.js</Text>
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2">Python</Text>
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2">SQL</Text>
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-2">AWS</Text>
        </View>
      </View>

      {/* Projects Section */}
      <View className="bg-white p-4 rounded-lg mb-5 shadow">
        <Text className="text-2xl font-bold text-gray-800 mb-3">Projects</Text>
        <View className="bg-gray-50 p-4 rounded-lg mb-3">
          <Text className="text-lg font-bold">E-commerce Platform</Text>
          <Text className="text-sm text-blue-600 mb-1">React, Node.js, MongoDB</Text>
          <Text className="text-sm text-gray-600">Full-stack web application with payment integration</Text>
        </View>
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text className="text-lg font-bold ">Task Management App</Text>
          <Text className="text-sm text-blue-600 mb-1">React Native, Firebase</Text>
          <Text className="text-sm text-gray-600">Cross-platform mobile app for project management</Text>
        </View>
      </View>

      {/* Resume Section */}
      <View className="bg-white p-4 rounded-lg mb-5 shadow">
        <Text className="text-lg font-bold text-gray-800 mb-3">Resume</Text>
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-gray-400 p-3 rounded-lg mr-2">
            <AntDesign name="upload" size={20} color="black" />
            <Text className="ml-2 text-base font-bold text-gray-800">Upload Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-blue-500 p-3 rounded-lg ml-2">
            <AntDesign name="download" size={20} color="white" />
            <Text className="ml-2 text-base font-bold text-white">Generate Resume</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center mt-4 text-xs text-gray-500">Last updated: March 8, 2024</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;