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

  return (
    <ScrollView className="bg-gray-100 flex-1">
      <View className="bg-blue-600 pt-12 pb-8 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between px-6 mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Company Details</Text>
          <View />
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
              {company.company_name}
            </Text>
            <Text className="text-lg text-white opacity-90">
              {company.type}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center px-6">
          <View className="flex-row items-center">
            <Ionicons name="cash-outline" size={20} color="white" />
            <Text className="text-lg font-semibold text-white ml-2">
              {company.salary}
            </Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-lg">
            <Text className="text-sm font-semibold text-green-600">
              {company.status}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between px-6 mt-2">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="white" />
            <Text className="text-lg font-semibold text-white ml-2">
              {company.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color="white" />
            <Text className="text-lg font-semibold text-white ml-2">
              {company.last_date}
            </Text>
          </View>
        </View>
      </View>

      {/* Job Description */}
      <View className="bg-white rounded-2xl mx-5 p-6 mt-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Job Description
        </Text>
        {company.job_description?.map((item: string, idx: number) => (
          <Text key={idx} className="text-base text-gray-700 mb-2">
            • {item}
          </Text>
        ))}
      </View>

      {/* Requirements */}
      <View className="bg-white rounded-2xl mx-5 p-6 mb-5 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Requirements
        </Text>
        {company.requirements?.map((item: string, idx: number) => (
          <Text key={idx} className="text-base text-gray-700 mb-2">
            • {item}
          </Text>
        ))}
      </View>

      {/* Selection Process */}
      <View className="bg-white rounded-2xl mx-5 p-6 mb-20 shadow-lg">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Selection Process
        </Text>
        {company.selection_process?.map((item: string, idx: number) => (
          <Text key={idx} className="text-base text-gray-700 mb-2">
            {idx + 1}. {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
