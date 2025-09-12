// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { supabase } from "@/lib/supabaseClient";

// export default function CompanyDetails() {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const [company, setCompany] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       supabase
//         .from("company_details")
//         .select("*")
//         .eq("id", id)
//         .single()
//         .then(({ data, error }) => {
//           if (error) console.error(error);
//           else setCompany(data);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   if (loading)
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-100">
//         <ActivityIndicator size="large" color="#6366f1" />
//       </View>
//     );

//   if (!company)
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-100">
//         <Text>No company found</Text>
//       </View>
//     );

//   return (
//     <ScrollView className="bg-gray-100 flex-1">
//       <View className="bg-blue-600 pt-12 pb-8 rounded-b-3xl shadow-lg">
//         <View className="flex-row items-center justify-between px-6 mb-6">
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={28} color="white" />
//           </TouchableOpacity>
//           <Text className="text-xl font-bold text-white">Company Details</Text>
//           <View />
//         </View>

//         <View className="flex-row items-center px-6 mb-4">
//           <View className="w-16 h-16 rounded-xl bg-white items-center justify-center mr-4 shadow-md">
//             <MaterialCommunityIcons
//               name="office-building"
//               size={36}
//               color="#4B5563"
//             />
//           </View>
//           <View>
//             <Text className="text-3xl font-bold text-white">
//               {company.company_name}
//             </Text>
//             <Text className="text-lg text-white opacity-90">
//               {company.type}
//             </Text>
//           </View>
//         </View>

//         <View className="flex-row justify-between items-center px-6">
//           <View className="flex-row items-center">
//             <Ionicons name="cash-outline" size={20} color="white" />
//             <Text className="text-lg font-semibold text-white ml-2">
//               {company.salary}
//             </Text>
//           </View>
//           <View className="bg-green-100 px-3 py-1 rounded-lg">
//             <Text className="text-sm font-semibold text-green-600">
//               {company.status}
//             </Text>
//           </View>
//         </View>
//         <View className="flex-row justify-between px-6 mt-2">
//           <View className="flex-row items-center">
//             <Ionicons name="location-outline" size={20} color="white" />
//             <Text className="text-lg font-semibold text-white ml-2">
//               {company.location}
//             </Text>
//           </View>
//           <View className="flex-row items-center">
//             <Ionicons name="calendar-outline" size={20} color="white" />
//             <Text className="text-lg font-semibold text-white ml-2">
//               {company.last_date}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Job Description */}
//       <View className="bg-white rounded-2xl mx-5 p-6 mt-6 mb-5 shadow-lg">
//         <Text className="text-xl font-bold text-gray-800 mb-4">
//           Job Description
//         </Text>
//         {company.job_description?.map((item: string, idx: number) => (
//           <Text key={idx} className="text-base text-gray-700 mb-2">
//             • {item}
//           </Text>
//         ))}
//       </View>

//       {/* Requirements */}
//       <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
//         <Text className="text-xl font-bold text-gray-800 mb-4">
//           Requirements
//         </Text>
//         {company.requirements?.map((item: string, idx: number) => (
//           <Text key={idx} className="text-base text-gray-700 mb-2">
//             • {item}
//           </Text>
//         ))}
//       </View>

//       {/* Selection Process */}
//       <View className="bg-white rounded-2xl mx-5 p-6 mb-20 shadow-lg">
//         <Text className="text-xl font-bold text-gray-800 mb-4">
//           Selection Process
//         </Text>
//         {company.selection_process?.map((item: string, idx: number) => (
//           <Text key={idx} className="text-base text-gray-700 mb-2">
//             {idx + 1}. {item}
//           </Text>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      supabase
        .from("company_details")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error) console.error(error);
          else setCompany(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );

  if (!company)
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text>No company found</Text>
      </View>
    );

  // Handle strings stored in DB instead of arrays
  const jobDescription = Array.isArray(company.job_description)
    ? company.job_description
    : company.job_description?.split("\n");
  const requirements = Array.isArray(company.requirements)
    ? company.requirements
    : company.requirements?.split("\n");
  const selectionProcess = Array.isArray(company.selection_process)
    ? company.selection_process
    : company.selection_process?.split("\n");

  return (
    <ScrollView
      className="bg-gray-100 flex-1"
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header */}
      <View className="bg-white px-6 py-5 shadow-sm flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={28} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Company Details</Text>
      </View>

      {/* Company Card */}
      <View className="bg-white rounded-2xl mx-0 mt-0 p-6 shadow-lg">
        <View className="flex-row items-start">
          <View className="w-16 h-16 rounded-xl bg-indigo-100 items-center justify-center mr-4">
            <MaterialCommunityIcons
              name="office-building"
              size={36}
              color="#6366f1"
            />
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {company.company_name}
            </Text>
            <Text className="text-base text-gray-600">{company.type}</Text>
          </View>
          <View
            className={`px-3 py-1 rounded-lg ${
              company.status === "Open" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                company.status === "Open" ? "text-green-600" : "text-red-600"
              }`}
            >
              {company.status}
            </Text>
          </View>
        </View>

        {/* Quick Info Badges */}
        <View className="flex-row flex-wrap mt-4">
          <View className="flex-row items-center bg-indigo-50 px-3 py-1 rounded-full mr-2 mb-2">
            <Ionicons name="cash-outline" size={16} color="#4F46E5" />
            <Text className="text-sm text-indigo-700 ml-1">{company.salary}</Text>
          </View>
          <View className="flex-row items-center bg-green-50 px-3 py-1 rounded-full mr-2 mb-2">
            <Ionicons name="location-outline" size={16} color="#059669" />
            <Text className="text-sm text-green-700 ml-1">{company.location}</Text>
          </View>
          <View className="flex-row items-center bg-yellow-50 px-3 py-1 rounded-full mr-2 mb-2">
            <Ionicons name="calendar-outline" size={16} color="#D97706" />
            <Text className="text-sm text-yellow-700 ml-1">
              {company.last_date}
            </Text>
          </View>
        </View>
      </View>

      {/* Job Description */}
      <View className="bg-white rounded-2xl mx-5 p-6 mt-6 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Job Description
        </Text>
        {jobDescription?.map((item: string, idx: number) => (
          <Text key={idx} className="text-base text-gray-700 mb-2">
            • {item}
          </Text>
        ))}
      </View>

      {/* Requirements */}
      <View className="bg-white rounded-2xl mx-5 p-6 mt-6 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">Requirements</Text>
        {requirements?.map((item: string, idx: number) => (
          <Text key={idx} className="text-base text-gray-700 mb-2">
            • {item}
          </Text>
        ))}
      </View>

      {/* Selection Process */}
      <View className="bg-white rounded-2xl mx-5 p-6 mt-6 mb-20 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Selection Process
        </Text>
        {selectionProcess?.map((item: string, idx: number) => (
          <Text key={idx} className="text-base text-gray-700 mb-2">
            {idx + 1}. {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
