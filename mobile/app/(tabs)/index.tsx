import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import UpcomingPlacements from "@/components/UpcomingPlacements";
import { supabase } from "@/lib/supabaseClient";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AttemptedAptitudes from "@/components/AttemptedAptitudes";

const Index: React.FC = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>("");

  const getQuote = async () => {
    try {
      const response = await axios.get("https://zenquotes.io/api/today");
      setQuotes(response.data);
    } catch (error: any) {
      console.log(`erorr :${error.message}`);
    }
  };

  const getUserProfile = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (user?.id) {
        const { data, error } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.warn("Could not fetch user profile:", error.message);
        } else if (data) {
          setUserName(data.full_name);
        }
      }
    } catch (err) {
      console.error("getUserProfile error", err);
    }
  };

  useEffect(() => {
    getQuote();
    getUserProfile();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-gray-100 flex-1"
    >
      <View className="h-[5.5em] bg-purple-500"></View>
      <View className="flex-row items-center justify-between bg-white mx-4 -mt-10 rounded-3xl p-4 shadow-md">
        <View className="flex-row items-center">
          <View className="w-14 h-14 bg-purple-500 rounded-full mr-3 flex items-center justify-center">
            <AntDesign name="user" size={40} color="white" />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-900">
              {userName ? `Hi ${userName}` : "Hi Student"}
            </Text>
            <Text className="text-sm text-gray-500">Welcome back 👋</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          {/* <TouchableOpacity className="bg-purple-500 p-3 mr-2 rounded-full">
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity> */}
          <Pressable
            onPress={async () => {
              await supabase.auth.signOut();
              router.replace("/");
            }}
            className="bg-red-500 px-4 py-3 rounded-full"
          >
            <Text className="text-white font-bold text-md">Logout</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-row justify-between mx-4 mt-6">
        <View className="flex-1 mx-1 bg-yellow-100 rounded-3xl p-4 items-center shadow-sm">
          <MaterialIcons name="library-books" size={32} color="#D97706" />
          <Text className="text-2xl font-bold text-gray-900 mt-2">2</Text>
          <Text className="text-sm text-gray-600">Companies</Text>
        </View>
        <View className="flex-1 mx-1 bg-purple-100 rounded-3xl p-4 items-center shadow-sm">
          <FontAwesome name="users" size={28} color="#7C3AED" />
          <Text className="text-2xl font-bold text-gray-900 mt-2">4</Text>
          <Text className="text-sm text-gray-600">Placed</Text>
        </View>
        <View className="flex-1 mx-1 bg-green-100 rounded-3xl p-4 items-center shadow-sm">
          <MaterialIcons name="money" size={32} color="#059669" />
          <Text className="text-2xl font-bold text-gray-900 mt-2">4.5</Text>
          <Text className="text-sm text-gray-600">Avg Package</Text>
        </View>
      </View>
      <View className="bg-white rounded-3xl mx-4 mt-6 p-6 shadow-md">
        <View className="flex-row items-center mb-3">
          <Ionicons name="heart-outline" size={22} color="#7C3AED" />
          <Text className="text-lg font-bold text-gray-900 ml-2">
            Quote for the Day
          </Text>
        </View>
        <View>
          <Text className="text-base text-gray-700 italic">
            &quot;{quotes.length > 0 && quotes[0].q}&quot; -{" "}
            {quotes.length > 0 && ` ${quotes[0].a}`}
          </Text>
        </View>
      </View>
      <View className="mx-4 mt-8 mb-6">
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Attempted Aptitudes
          </Text>
          <AttemptedAptitudes />
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-semibold text-gray-900">
            Upcoming Placements
          </Text>
          <TouchableOpacity>
            <Link href="/(tabs)/PlacementInfo">
              <Text className="text-purple-600 font-semibold text-base">
                View All
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
        <UpcomingPlacements />
      </View>
    </ScrollView>
  );
};

export default Index;
