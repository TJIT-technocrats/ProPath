import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
import UpcomingPlacements from "@/components/UpcomingPlacements";

const index: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-100">
      <View className="p-6 w-full">
        <View className="flex flex-row items-center justify-between mb-6">
          <View className="flex flex-col justify-center">
            <Text className="text-4xl font-bold text-gray-800">Dashboard</Text>
            <Text className="text-xl text-gray-600">Welcome back, Yugi!</Text>
          </View>
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity>
              <Ionicons name="notifications-outline" color="#000" size={32} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" color="#000" size={32} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <View className="flex-row items-center mb-3">
            <Ionicons name="heart-outline" size={24} color="#7B68EE" />
            <Text className="text-xl font-bold text-gray-800 ml-2">
              Quote for Humanity
            </Text>
          </View>
          <Text className="text-base text-gray-700 italic leading-relaxed">
            "The best way to find yourself is to lose yourself in the service of
            others." – Mahatma Gandhi
          </Text>
        </View>

        <View className="flex flex-row items-center justify-around w-full mb-6">
          <View className="w-[30%] flex flex-col gap-3 items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
            <MaterialIcons name="library-books" size={40} color="#34D399" />
            <Text className="text-3xl font-bold text-gray-800">2</Text>
            <Text className="text-base text-gray-600">Companies</Text>
          </View>
          <View className="w-[30%] flex flex-col gap-3 items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
            <FontAwesome name="users" size={36} color="#3B82F6" />
            <Text className="text-3xl font-bold text-gray-800">4</Text>
            <Text className="text-base text-gray-600">Placed</Text>
          </View>
          <View className="w-[30%] flex flex-col gap-3 items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
            <MaterialIcons name="money" color="#F59E0B" size={40} />
            <Text className="text-3xl font-bold text-gray-800">4.5</Text>
            <Text className="text-base text-gray-600">Avg Package</Text>
          </View>
        </View>

        <View>
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-semibold text-gray-800">
              Upcoming Placements
            </Text>
            <Link
              href="/(tabs)/PlacementInfo"
              className="text-blue-600 font-semibold text-base"
            >
              View All
            </Link>
          </View>
          <UpcomingPlacements />
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
