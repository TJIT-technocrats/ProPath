import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabaseClient";

interface Company {
  id: number;
  company_name: string;
  type: string;
  salary_or_stipend: string;
  interview_date: string;
}

export default function UpcomingPlacements() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("company_details")
        .select("*")
        .gt("interview_date", new Date().toISOString())
        .order("interview_date", { ascending: true });

      if (!error && data) setCompanies(data as Company[]);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const renderCompany = ({ item }: { item: Company }) => (
    <Pressable
      className="flex-row justify-between items-center bg-white py-4 px-5 rounded-3xl mb-3 shadow-md"
      onPress={() =>
        router.push({
          pathname: "/CompanyDetails",
          params: { id: item.id },
        })
      }
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-2xl bg-purple-100 items-center justify-center mr-3">
          <MaterialCommunityIcons name="briefcase" size={28} color="#7C3AED" />
        </View>
        <View>
          <Text className="text-base font-bold text-gray-900">
            {item.company_name}
          </Text>
          <Text className="text-sm text-gray-500">{item.type}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-sm font-semibold text-green-600 mb-1">
          {item.salary_or_stipend}
        </Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text className="text-xs text-gray-500 ml-1">
            {new Date(item.interview_date).toDateString()}
          </Text>
        </View>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-green-600">Open</Text>
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <FlatList
      data={companies}
      renderItem={renderCompany}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
