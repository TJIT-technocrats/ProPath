import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Company = {
  id: number;
  name: string;
  role: string;
  salary: string;
  lastDate: string;
  location: string;
  cgpa: string;
  status: string;
};

const companiesData: Company[] = [
  {
    id: 1,
    name: "Google",
    role: "Software Engineer",
    salary: "₹25 LPA",
    lastDate: "March 15, 2024",
    location: "Bangalore",
    cgpa: "7.5+ CGPA",
    status: "Open",
  },
  {
    id: 2,
    name: "Microsoft",
    role: "Product Manager",
    salary: "₹22 LPA",
    lastDate: "March 18, 2024",
    location: "Hyderabad",
    cgpa: "7.0+ CGPA",
    status: "Open",
  },
  {
    id: 3,
    name: "Apple",
    role: "UI/UX Designer",
    salary: "₹20 LPA",
    lastDate: "March 20, 2024",
    location: "Pune",
    cgpa: "7.0+ CGPA",
    status: "Open",
  },
  {
    id: 4,
    name: "Amazon",
    role: "Data Analyst",
    salary: "₹18 LPA",
    lastDate: "March 22, 2024",
    location: "Chennai",
    cgpa: "6.5+ CGPA",
    status: "Open",
  },
  {
    id: 5,
    name: "Meta",
    role: "Research Scientist",
    salary: "₹28 LPA",
    lastDate: "March 25, 2024",
    location: "Mumbai",
    cgpa: "8.0+ CGPA",
    status: "Open",
  },
];

const CompanyCard = ({
  company,
  index,
}: {
  company: Company;
  index: number;
}) => {
  return (
    <View>
      <TouchableOpacity className="bg-white p-4 my-2 rounded-2xl shadow-lg">
        <View className="flex-row items-start">
          <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center mr-3">
            <MaterialCommunityIcons
              name="briefcase"
              size={28}
              color="#6366f1"
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">
              {company.name}
            </Text>
            <Text className="text-base text-gray-600 mb-2">{company.role}</Text>
            <View className="flex-row items-center mb-1">
              <Ionicons name="cash-outline" size={16} color="#34D399" />
              <Text className="text-base font-semibold text-green-600 ml-2">
                {company.salary}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-2">
                {company.lastDate}
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
              <Text className="text-sm text-gray-600 ml-2">{company.cgpa}</Text>
            </View>
          </View>
          <View
            className={`px-3 py-1 rounded-lg ${company.status === "Open" ? "bg-green-100" : "bg-red-100"}`}
          >
            <Text
              className={`text-sm font-semibold ${company.status === "Open" ? "text-green-600" : "text-red-600"}`}
            >
              {company.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function Companies() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "salary" | "lastDate">("name");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const filteredCompanies = companiesData
    .filter(
      (company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "salary") {
        const salaryA = parseFloat(
          a.salary.replace("₹", "").replace(" LPA", "")
        );
        const salaryB = parseFloat(
          b.salary.replace("₹", "").replace(" LPA", "")
        );
        return salaryB - salaryA;
      }
      if (sortBy === "lastDate")
        return new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime();
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
                setSortBy("name");
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
                setSortBy("lastDate");
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
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <CompanyCard key={company.id} company={company} index={index} />
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
