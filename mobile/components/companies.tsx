import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
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
  { id: 1, name: "Google", role: "Software Engineer", salary: "₹25 LPA", lastDate: "March 15, 2024", location: "Bangalore", cgpa: "7.5+ CGPA", status: "Open" },
  { id: 2, name: "Microsoft", role: "Product Manager", salary: "₹22 LPA", lastDate: "March 18, 2024", location: "Hyderabad", cgpa: "7.0+ CGPA", status: "Open" },
  { id: 3, name: "Apple", role: "UI/UX Designer", salary: "₹20 LPA", lastDate: "March 20, 2024", location: "Pune", cgpa: "7.0+ CGPA", status: "Open" },
  { id: 4, name: "Amazon", role: "Data Analyst", salary: "₹18 LPA", lastDate: "March 22, 2024", location: "Chennai", cgpa: "6.5+ CGPA", status: "Open" },
  { id: 5, name: "Meta", role: "Research Scientist", salary: "₹28 LPA", lastDate: "March 25, 2024", location: "Mumbai", cgpa: "8.0+ CGPA", status: "Open" },
];

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <View style={styles.logo}>
          <MaterialCommunityIcons name="briefcase" size={28} color="#6366f1" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.role}>{company.role}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={16} color="green" />
            <Text style={styles.salary}>{company.salary}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="gray" />
            <Text style={styles.detail}>{company.lastDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text style={styles.detail}>{company.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={16} color="gray" />
            <Text style={styles.detail}>{company.cgpa}</Text>
          </View>
        </View>
        <Text style={styles.status}>{company.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Companies() {
  const [search, setSearch] = useState("");

  const filteredCompanies = companiesData.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.search}
          placeholder="Search companies or roles..."
          placeholderTextColor="gray"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <Text style={styles.noResults}>No companies found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subheading: {
    fontSize: 16,
    color: "gray",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db", // light border for visibility
  },
  search: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    fontSize: 15,
    color: "gray",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  salary: {
    fontSize: 15,
    fontWeight: "600",
    color: "green",
    marginLeft: 6,
  },
  detail: {
    fontSize: 14,
    color: "gray",
    marginLeft: 6,
  },
  status: {
    backgroundColor: "#d1fae5",
    color: "#059669",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  noResults: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
