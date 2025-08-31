import { View, Text, ScrollView } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
import UpcomingPlacements from "@/components/UpcomingPlacements";

const index: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-6 px-4 pt-14 w-full">
        <View className="flex flex-row items-center justify-between mb-6">
          <View className="flex flex-col justify-center">
            <Text className="text-3xl font-semibold">Dashboard</Text>
            <Text className="text-lg">Welcome back ,Yugi!</Text>
          </View>
          <View>
            <Ionicons name="notifications" color="#000" size={36} />
          </View>
        </View>
        <View className="flex flex-row items-center justify-around w-full">
          <View className="w-[32%] flex flex-col gap-2 items-center justify-center bg-white p-3 rounded-2xl">
            <MaterialIcons name="library-books" size={36} color="green" />
            <Text className="text-2xl font-semibold">2</Text>
            <Text className="text-md">Companies</Text>
          </View>
          <View className="w-[32%] flex flex-col gap-2 items-center justify-center bg-white p-3 rounded-2xl">
            <FontAwesome name="users" size={32} color="blue" />
            <Text className="text-2xl font-semibold">4</Text>
            <Text className="text-md">Placed</Text>
          </View>
          <View className="w-[32%] flex flex-col gap-2 items-center justify-center bg-white p-3 rounded-2xl">
            <MaterialIcons name="money" color="orange" size={36} />
            <Text className="text-2xl font-semibold">4.5</Text>
            <Text className="text-md">Avg Package</Text>
          </View>
        </View>
        <View className="mt-7">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl">Upcoming Placements</Text>
            <Link
              href="/(tabs)/PlacementInfo"
              className="text-blue-600 font-semibold"
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
