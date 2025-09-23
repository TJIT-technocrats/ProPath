import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
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

const CompanyCard = ({ company, index }: { company: Company; index: number }) => {
  const router = useRouter();
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options).toUpperCase().replace(/,/, '');
  };
  
  const cardBackgroundColor = index % 2 === 0 ? "#DBDCFF" : "#F3F4F6";

  return (
    <Pressable
      className="p-5 my-3 rounded-3xl shadow-lg relative"
      style={{ backgroundColor: cardBackgroundColor, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 }}
      onPress={() =>
        router.push({
          pathname: "/CompanyDetails",
          params: { id: company.id.toString() },
        })
      }
    >
      <View className="flex-row justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-14 h-14 rounded-2xl items-center justify-center mr-4">
            <MaterialCommunityIcons name="briefcase" size={30} color="#6366f1" />
          </View>
          <View>
            <Text className="text-xl font-bold text-gray-900">
              {company.company_name}
            </Text>
            <Text className="text-sm text-gray-500">{company.type}</Text>
          </View>
        </View>
        <View
          className={`px-4 py-1 rounded-full self-start`}
          style={{
            backgroundColor: company.status === "Open" ? "#D1FAE5" : "#DC2626",
          }}
        >
          <Text
            className={`text-sm font-bold`}
            style={{
              color: company.status === "Open" ? "#059669" : "#DC2626",
            }}
          >
            {company.status}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center mb-2">
        <View className="flex-row items-center py-2 px-3 rounded-xl mr-2" style={{ backgroundColor: "#8B5CF6" }}>
          <Ionicons name="cash-outline" size={16} color="white" />
          <Text className="text-xs font-semibold text-white ml-1">
            {company.salary}
          </Text>
        </View>
        <View className="flex-row items-center py-2 px-3 rounded-xl" style={{ backgroundColor: "#ffffff" }}>
          <Ionicons name="location-outline" size={12} color="black" />
          <Text className="text-xs font-semibold text-black ml-1">
            {company.location}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="flex-row items-center py-2 px-3 rounded-xl mr-2" style={{ backgroundColor: "#6366f1" }}>
          <Ionicons name="school-outline" size={12} color="white" />
          <Text className="text-xs font-semibold text-white ml-1">
            {company.cgpa_required}
          </Text>
        </View>
        <View className="flex-row items-center py-2 px-3 rounded-xl" style={{ backgroundColor: "#1f2937" }}>
          <Ionicons name="calendar-outline" size={12} color="white" />
          <Text className="text-xs font-semibold text-white ml-1">
            {getFormattedDate(company.last_date)}
          </Text>
        </View>
      </View>
      <View
        className="absolute bottom-5 right-5 w-12 h-12 rounded-full items-center justify-center shadow-lg"
        style={{ backgroundColor: "#6366f1", shadowColor: "#6366f1", shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 }}
      >
        <Ionicons name="arrow-up" size={24} color="white" style={{ transform: [{ rotate: '45deg' }] }} />
      </View>
    </Pressable>
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
      setLoading(true);
      const { data, error } = await supabase
        .from("company_details")
        .select(
          "id, company_name, type, salary, last_date, location, cgpa_required, status"
        );

      if (error) {
        console.error("Error fetching companies:", error);
      } else if (data) {
        setCompanies(data as Company[]);
      }
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
    <View className="flex bg-white p-4">
      <View>
        <View className="flex-row items-center mb-5">
          <View className="flex-1 mr-3">
            <View className="flex-row items-center bg-violet-200 rounded-full px-4 py-3 shadow-sm">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Search companies or roles..."
                className="ml-2 flex-1 text-sm text-gray-700"
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              className="p-3 rounded-full shadow-sm" 
              onPress={() => setFilterModalVisible(true)}
            >
              <Ionicons name="filter" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
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
                className="py-4 mt-2"
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
            filteredCompanies.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))
          ) : (
            <Text className="text-sm text-gray-500 text-center mt-6">
              No companies found
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}