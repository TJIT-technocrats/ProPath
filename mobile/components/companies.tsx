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
import { supabase } from "@/lib/supabaseClient"; // adjust path
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
      className="bg-white p-4 my-2 rounded-2xl shadow-lg"
      onPress={() =>
        router.push({
          pathname: "/CompanyDetails",
          params: { id: company.id.toString() }, // pass id
        })
      }
    >
      <View className="flex-row items-start">
        <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center mr-3">
          <MaterialCommunityIcons name="briefcase" size={28} color="#6366f1" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">
            {company.company_name}
          </Text>
          <Text className="text-base text-gray-600 mb-2">{company.type}</Text>
          <View className="flex-row items-center mb-1">
            <Ionicons name="cash-outline" size={16} color="#34D399" />
            <Text className="text-base font-semibold text-green-600 ml-2">
              {company.salary}
            </Text>
          </View>
          <View className="flex-row items-center mb-1">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {company.last_date}
            </Text>
          </View>
          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {company.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="school-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {company.cgpa_required}
            </Text>
          </View>
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

      if (error) console.error(error);
      else setCompanies(data as Company[]);
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
    <View className="flex-1 p-4 bg-gray-100">
      {/* Search and Sort */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 mr-2">
          <View className="flex-row items-center bg-white rounded-full p-3 shadow-md">
            <Ionicons name="search" size={24} color="#6B7280" />
            <TextInput
              placeholder="Search companies or roles..."
              className="ml-2 flex-1 text-base text-gray-700"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-full shadow-md"
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Sort By
            </Text>
            <TouchableOpacity
              className="py-3"
              onPress={() => {
                setSortBy("company_name");
                setFilterModalVisible(false);
              }}
            >
              <Text className="text-base text-gray-700">Company Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3"
              onPress={() => {
                setSortBy("salary");
                setFilterModalVisible(false);
              }}
            >
              <Text className="text-base text-gray-700">Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3"
              onPress={() => {
                setSortBy("last_date");
                setFilterModalVisible(false);
              }}
            >
              <Text className="text-base text-gray-700">Last Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3"
              onPress={() => setFilterModalVisible(false)}
            >
              <Text className="text-base text-blue-600 font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Companies List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#6366f1" />
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <Text className="text-base text-gray-600 text-center mt-6">
            No companies found
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
