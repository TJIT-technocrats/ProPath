import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";

type Company = {
  id: number;
  company_name: string;
  type: string;
  salary: string;
  last_date: string;
  location: string;
  cgpa_required: string;
  status: string;
};

const CompanyCard = ({ company }: { company: Company }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-white p-5 my-3 rounded-3xl shadow-md"
      onPress={() =>
        router.push({
          pathname: "/CompanyDetails",
          params: { id: company.id.toString() },
        })
      }
    >
      <View className="flex-row items-start">
        <View className="w-14 h-14 rounded-2xl bg-purple-100 items-center justify-center mr-4">
          <MaterialCommunityIcons name="briefcase" size={30} color="#7C3AED" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">
            {company.company_name}
          </Text>
          <Text className="text-sm text-gray-500 mb-2">{company.type}</Text>
          <View className="flex-row items-center mb-1">
            <Ionicons name="cash-outline" size={16} color="#059669" />
            <Text className="text-sm font-semibold text-green-600 ml-2">
              {company.salary}
            </Text>
          </View>
          <View className="flex-row items-center mb-1">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-2">
              {company.last_date}
            </Text>
          </View>
          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-2">
              {company.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="school-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-2">
              {company.cgpa_required}
            </Text>
          </View>
        </View>
        <View
          className={`px-3 py-1 rounded-full self-start ${
            company.status === "Open" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              company.status === "Open" ? "text-green-700" : "text-red-700"
            }`}
          >
            {company.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Companies() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"company_name" | "salary" | "last_date">(
    "company_name"
  );
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from("company_details")
        .select(
          "id, company_name, type, salary, last_date, location, cgpa_required, status"
        );

      if (!error && data) setCompanies(data as Company[]);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies
    .filter(
      (company) =>
        company.company_name.toLowerCase().includes(search.toLowerCase()) ||
        company.type.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "company_name")
        return a.company_name.localeCompare(b.company_name);
      if (sortBy === "salary") {
        const salaryA = parseFloat(
          a.salary.replace("₹", "").replace(" LPA", "")
        );
        const salaryB = parseFloat(
          b.salary.replace("₹", "").replace(" LPA", "")
        );
        return salaryB - salaryA;
      }
      if (sortBy === "last_date")
        return (
          new Date(a.last_date).getTime() - new Date(b.last_date).getTime()
        );
      return 0;
    });

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {/* Search + Filter */}
      <View className="flex-row items-center mb-5">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search companies or roles..."
              className="ml-2 flex-1 text-sm text-gray-700"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
        <TouchableOpacity
          className="bg-purple-500 p-3 rounded-full shadow-sm"
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white p-6 rounded-t-3xl shadow-2xl">
            <Text className="text-xl font-bold text-gray-900 mb-5">
              Sort By
            </Text>
            {["company_name", "salary", "last_date"].map((field) => (
              <TouchableOpacity
                key={field}
                className="py-4 border-b border-gray-100"
                onPress={() => {
                  setSortBy(field as any);
                  setFilterModalVisible(false);
                }}
              >
                <Text className="text-base text-gray-700 capitalize">
                  {field.replace("_", " ")}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="py-4"
              onPress={() => setFilterModalVisible(false)}
            >
              <Text className="text-base text-purple-600 font-semibold text-center">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#7C3AED" />
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <Text className="text-sm text-gray-500 text-center mt-6">
            No companies found
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
