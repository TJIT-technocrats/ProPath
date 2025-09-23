import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
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
import { LinearGradient } from 'expo-linear-gradient';

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

    const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await supabase.auth.signOut();
            router.replace("/");
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      flex: 1,
    }}
  >
    <LinearGradient
      // These are the two colors you want to mix
      colors={['#C1AFFC', '#8B5CF6']} 
      // This defines the start and end points of the gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      // This style is crucial to make the gradient fill the entire ScrollView
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    />

      {/* Header Section */}
      <View style={{
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#EDEFFF',
      }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-purple-800 rounded-full mr-3 flex items-center justify-center">
              <AntDesign name="user" size={24} color="white" />
            </View>
            <Text className="text-xl font-bold text-black">
              {userName ? `Hey, ${userName}` : "Hey, Student"}
            </Text>
          </View>
        </View>
      </View>

      {/* Quote Section */}
<View style={{
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 16
}}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name="heart-outline" size={28} color="#7C3AED" style={{ marginBottom: 10 }} />
    <Text 
      className="text-purple-900 font-bold text-xl ml-2" // Increased font size and added left margin for the gap
      style={{
        marginBottom: 10, // Reduced bottom margin to create a tighter look
        fontSize: 18,    // You can also use this to control font size
      }}
    >
      Quote for the Day
    </Text>
  </View>
  <Text 
    className="text-black text-base leading-6" // Increased font size and line height
    style={{
      fontSize: 14, // You can also use this to control font size
    }}
  >
    {`"${quotes.length > 0 && quotes[0].q}"`} - {quotes.length > 0 && quotes[0].a}
  </Text>
</View>

      {/* Stats Cards */}
      <View className="flex-row justify-between mx-4 mt-6">
        <View style={{
          flex: 1,
          marginHorizontal: 4,
          backgroundColor: '#D8DAFF',
          borderRadius: 20,
          padding: 16,
          alignItems: 'center'
        }}>
          <MaterialIcons name="library-books" size={28} color="#7C3AED" />
          <Text className="text-xl font-bold text-purple-800 mt-2">2</Text>
          <Text className="text-xs text-black">Companies</Text>
        </View>
        <View style={{
          flex: 1,
          marginHorizontal: 4,
          backgroundColor: '#EDEFFF',
          borderRadius: 20,
          padding: 16,
          alignItems: 'center'
        }}>
          <FontAwesome name="users" size={24} color="#7C3AED" />
          <Text className="text-xl font-bold text-purple-800 mt-2">4</Text>
          <Text className="text-xs text-black">Placed</Text>
        </View>
        <View style={{
          flex: 1,
          marginHorizontal: 4,
          backgroundColor: '#D8DAFF',
          borderRadius: 20,
          padding: 16,
          alignItems: 'center'
        }}>
          <MaterialIcons name="money" size={28} color="#7C3AED" />
          <Text className="text-xl font-bold text-purple-800 mt-2">4.5</Text>
          <Text className="text-xs text-black">Avg Package</Text>
        </View>
      </View>

      <View style={{
        backgroundColor: '#ffffff', // White background for the main container
        marginTop: 24,            // Adjust top margin as needed
        marginBottom: 50,         // Ensure enough bottom space above the tab bar
        borderRadius: 32,         // Rounded corners for the entire container
        paddingVertical: 20,      // Vertical padding inside the container
        paddingHorizontal: 16,    // Horizontal padding inside the container
      }}>
        <View className="mb-2">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Attempted Aptitudes
          </Text>
          <View style={{
            backgroundColor: '#D8DAFF',
            borderRadius: 16, 
            padding: 8 
          }}>
            <AttemptedAptitudes />
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-4 mt-6"> {/* Added mt-6 for spacing between sections */}
          <Text className="text-lg font-bold text-gray-800">
            Upcoming Placements
          </Text>
          <TouchableOpacity>
            <Link href="/(tabs)/PlacementInfo">
              <Text className="text-purple-700 font-semibold text-sm">
                View All
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
        {/* This inner View can also be transparent or have a different background */}
        <View style={{
            // No specific background here, or set to transparent
            backgroundColor: '#D8DAFF',
            borderRadius: 16,
            padding: 8 // Keep padding if needed for inner content
        }}>
          <UpcomingPlacements />
        </View>
      </View>

      {/* Logout Button - Positioned as floating */}
      <View className="absolute top-14 right-6">
        <Pressable
          onPress={handleLogout} // Calls the new handler function
          style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
          }}
        >
          <AntDesign name="logout" size={24} color="red" />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Index;