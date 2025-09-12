// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { Link } from "expo-router";
// import UpcomingPlacements from "@/components/UpcomingPlacements";

// import { supabase } from "@/lib/supabaseClient";

// const Index: React.FC = () => {
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       className="bg-gray-100 flex-1"
//     >
//       <View className="p-6 w-full">
//         {/* Header */}
//         <View className="flex-row items-center justify-between mb-6">
//           <View>
//             <Text className="text-4xl font-bold text-gray-800">Dashboard</Text>
//             <Text className="text-xl text-gray-600">Welcome back, Yugi!</Text>
//           </View>
//           <View className="flex-row items-center gap-4">
//             <Pressable
//               onPress={() => supabase.auth.signOut()}
//               className="bg-red-600 h-10 w-20 rounded-2xl flex items-center justify-center"
//             >
//               <Text className="text-white font-semibold">Logout</Text>
//             </Pressable>

//             <TouchableOpacity>
//               <Ionicons name="notifications-outline" size={36} color="#000" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Quote Card */}
//         <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
//           <View className="flex-row items-center mb-3">
//             <Ionicons name="heart-outline" size={24} color="#7B68EE" />
//             <Text className="text-xl font-bold text-gray-800 ml-2">
//               Quote for Humanity
//             </Text>
//           </View>
//           <Text className="text-base text-gray-700 italic leading-relaxed">
//             "The best way to find yourself is to lose yourself in the service of
//             others." – Mahatma Gandhi
//           </Text>
//         </View>

//         {/* Stats */}
//         <View className="flex-row justify-around mb-6 w-full">
//           <View className="w-[30%] items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
//             <MaterialIcons name="library-books" size={40} color="#34D399" />
//             <Text className="text-3xl font-bold text-gray-800">2</Text>
//             <Text className="text-base text-gray-600">Companies</Text>
//           </View>
//           <View className="w-[30%] items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
//             <FontAwesome name="users" size={36} color="#3B82F6" />
//             <Text className="text-3xl font-bold text-gray-800">4</Text>
//             <Text className="text-base text-gray-600">Placed</Text>
//           </View>
//           <View className="w-[30%] items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
//             <MaterialIcons name="money" size={40} color="#F59E0B" />
//             <Text className="text-3xl font-bold text-gray-800">4.5</Text>
//             <Text className="text-base text-gray-600">Avg Package</Text>
//           </View>
//         </View>

//         {/* Upcoming Placements */}
//         <View>
//           <View className="flex-row items-center justify-between mb-4">
//             <Text className="text-2xl font-semibold text-gray-800">
//               Upcoming Placements
//             </Text>
//             <TouchableOpacity>
//               <Link href="/(tabs)/PlacementInfo">
//                 <Text className="text-blue-600 font-semibold text-base">
//                   View All
//                 </Text>
//               </Link>
//             </TouchableOpacity>
//           </View>
//           <UpcomingPlacements />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Index;
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
import UpcomingPlacements from "@/components/UpcomingPlacements";
import { supabase } from "@/lib/supabaseClient";
import { AntDesign } from "@expo/vector-icons";

const Index: React.FC = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-gray-50 flex-1"
    >
      {/* ===== HEADER ===== */}
      <View className="flex-row items-center justify-between bg-white mx-4 mt-6 rounded-3xl p-4 shadow-md">
        <View className="flex-row items-center">
          {/* <Image
            source={{ uri: "https://placehold.co/60x60" }}
            className="w-14 h-14 rounded-full mr-3"
          /> */}
          <View className="w-14 h-14 rounded-full mr-3">
            <AntDesign name="user" size={44} color="purple" />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-900">Hi Yugi</Text>
            <Text className="text-sm text-gray-500">Welcome back 👋</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="bg-purple-500 p-3 mr-2 rounded-full">
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <Pressable
            onPress={() => supabase.auth.signOut()}
            className="bg-red-500 px-4 py-3 rounded-full"
          >
            <Text className="text-white font-semibold text-sm">Logout</Text>
          </Pressable>
        </View>
      </View>

      {/* ===== STATS CARDS ===== */}
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

      {/* ===== QUOTE CARD ===== */}
      <View className="bg-white rounded-3xl mx-4 mt-6 p-6 shadow-md">
        <View className="flex-row items-center mb-3">
          <Ionicons name="heart-outline" size={22} color="#7C3AED" />
          <Text className="text-lg font-bold text-gray-900 ml-2">
            Quote for Humanity
          </Text>
        </View>
        <Text className="text-base text-gray-700 italic">
          "The best way to find yourself is to lose yourself in the service of
          others." – Mahatma Gandhi
        </Text>
      </View>

      {/* ===== UPCOMING PLACEMENTS ===== */}
      <View className="mx-4 mt-8 mb-6">
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
